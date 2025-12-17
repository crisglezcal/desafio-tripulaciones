import { useState } from "react";
import { Circles } from "react-loader-spinner";
import MessageBubble from "../MessageBubble/MessageBubble";
import DataTable from "../DataTable/DataTable";
import { sendChatMessage } from "../../../services/chatServices2";
import "../Chatbox/Chatbox.css";

/**
 * 🔧 Adaptador de la API externa → formato del chat
 */
const adaptApiResponse = (apiResponse) => {
  const messages = [];

  if (!apiResponse || !apiResponse.exito) {
    messages.push({
      from: "bot",
      text: "❌ Error en la respuesta del servidor"
    });
    return messages;
  }

  // 🟢 Texto descriptivo
  if (apiResponse.mensaje) {
    messages.push({
      from: "bot",
      text: apiResponse.mensaje
    });
  }

  // 🟢 Tabla
  if (apiResponse.columnas && apiResponse.datos) {
    messages.push({
      type: "table",
      data: {
        headers: apiResponse.columnas,
        rows: apiResponse.datos.map(row =>
          apiResponse.columnas.map(col => row[col])
        )
      }
    });
  }

  // 🟢 Gráfica (imagen base64)
  if (apiResponse.tiene_grafica && apiResponse.grafica_base64) {
    messages.push({
      type: "image",
      content: apiResponse.grafica_base64
    });
  }

  return messages;
};

const ChatBox2 = () => {
  const role = localStorage.getItem("role");
  if (role !== "mkt" && role !== "hr") return null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 😺 ¿en qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const apiResponse = await sendChatMessage(userMessage);
      const adaptedMessages = adaptApiResponse(apiResponse);

      adaptedMessages.forEach(msg => {
        setMessages(prev => [...prev, msg]);
      });
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "❌ Error al conectar con el servidor" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =====================
          BOTÓN FLOTANTE
      ===================== */}
      {!isOpen && (
        <button
          className="chatbox-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir asistente"
        >
          <img src="/catbox_logo.png" alt="Catbox Logo" />
        </button>
      )}

      {/* =====================
          CHAT
      ===================== */}
      {isOpen && (
        <div className="chatbox">
          {/* HEADER */}
          <div className="chatbox-header">
            <div className="chatbox-header-icon">
              <img src="/catbox_logo.png" alt="Catbox Logo" />
            </div>

            <div className="chatbox-header-text">
              <h4>CatBox - Tu Asistente Virtual</h4>
              <span>Consulta ventas, clientes y empleados</span>
            </div>

            <button
              className="chatbox-close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          {/* MENSAJES */}
          <div className="chatbox-messages">
            {messages.map((msg, i) => {
              // 🟢 Tabla
              if (msg.type === "table") {
                return (
                  <DataTable
                    key={i}
                    headers={msg.data.headers}
                    rows={msg.data.rows}
                  />
                );
              }

              // 🟢 Imagen / gráfica
              if (msg.type === "image") {
                return (
                  <img
                    key={i}
                    src={msg.content}
                    alt="Gráfica"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "8px",
                      marginTop: "8px"
                    }}
                  />
                );
              }

              // 🟢 Texto normal
              return (
                <MessageBubble
                  key={i}
                  from={msg.from}
                  text={msg.text}
                />
              );
            })}

            {/* 🟡 Spinner de carga */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "12px 0"
                }}
              >
                <Circles
                  height="40"
                  width="40"
                  color="#222222ff"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="chatbox-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox2;
