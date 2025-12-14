import React from "react";
import { BrowserRouter } from 'react-router-dom'

//COMPONENTES CENTRALES
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'

function App() {
  return(
    <>
     <BrowserRouter>
          <Header/>
          <Main/>
     </BrowserRouter>
    </>
  )
   
}

export default App;
