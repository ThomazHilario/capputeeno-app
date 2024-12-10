// import React router dom
import { BrowserRouter } from 'react-router-dom'

// import Context
import ContextCart from './Context/context'

// import global css
import './index.css'

// import Components
import RoutesNavegation from './Routes/routes'
import { Header } from './Components/Header/header'

function App() {


  return (
    <>
      <ContextCart>
        <BrowserRouter>

          {/* Componente Header */}
          <Header/>
          
          {/* Componente de rotas */}
          <RoutesNavegation/>

        </BrowserRouter>
      </ContextCart>
    </>
  )
}

export default App
