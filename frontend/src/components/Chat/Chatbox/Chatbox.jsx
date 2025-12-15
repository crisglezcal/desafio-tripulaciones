import { useState } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import SummaryCard from "../SummaryCard/SummaryCard";
import DataTable from "../DataTable/DataTable";
import { sendChatMessage } from "../../../services/chatServices";
import "../Chatbox/Chatbox.css";

const ChatBox = () => {
  const role = localStorage.getItem("role");
  if (role !== "mkt" && role !== "hr") return null;

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 😺 ¿en qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");
  const [pendingIntent, setPendingIntent] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages(prev => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await sendChatMessage(userMessage);

      if (response?.type === "intent" && response.data?.needsDateRange) {
        setPendingIntent(response.data);
        setMessages(prev => [
          ...prev,
          { from: "bot", text: "📅 Para responder a eso necesito un rango de fechas." }
        ]);
        return;
      }

      if (response?.type === "summary" || response?.type === "table") {
        setMessages(prev => [...prev, response]);
        return;
      }

      if (response?.type === "text" && response?.content) {
        setMessages(prev => [
          ...prev,
          { from: "bot", text: response.content }
        ]);
        return;
      }

      setMessages(prev => [
        ...prev,
        { from: "bot", text: "ℹ️ He recibido la respuesta, pero no pude interpretarla." }
      ]);

    } catch {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "❌ Error al conectar con el servidor" }
      ]);
    }
  };

  return (
    <>
      {/* =====================
          BOTÓN FLOTANTE (ABRIR)
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

            {/* BOTÓN CERRAR */}
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
              if (msg.type === "summary") {
                return (
                  <SummaryCard
                    key={i}
                    title={msg.content}
                    value={msg.data.total}
                  />
                );
              }

              if (msg.type === "table") {
                return (
                  <DataTable
                    key={i}
                    headers={msg.data.headers}
                    rows={msg.data.rows}
                  />
                );
              }

              return (
                <MessageBubble
                  key={i}
                  from={msg.from}
                  text={msg.text}
                />
              );
            })}
          </div>

          {/* DATE RANGE PICKER */}
          {pendingIntent && (
            <DateRangePicker
              onConfirm={async (range) => {
                setMessages(prev => [
                  ...prev,
                  {
                    from: "user",
                    text: `📅 Desde ${range.from} hasta ${range.to}`
                  }
                ]);

                try {
                  const response = await sendChatMessage({
                    message: pendingIntent,
                    dateRange: range
                  });

                  if (response?.type === "summary" || response?.type === "table") {
                    setMessages(prev => [...prev, response]);
                  }
                } catch {
                  setMessages(prev => [
                    ...prev,
                    { from: "bot", text: "❌ Error ejecutando la consulta" }
                  ]);
                }

                setPendingIntent(null);
              }}
            />
          )}

          {/* INPUT */}
          <div className="chatbox-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;