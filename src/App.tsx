import { BrowserRouter } from 'react-router-dom'
import RoutesNavegation from './Routes/routes'
import './index.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesNavegation/>
      </BrowserRouter>
    </>
  )
}

export default App
