import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioProvider.jsx'
import { AlimentoProvider } from './context/AlimentoProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <AlimentoProvider>
        <App />
      </AlimentoProvider>
    </UsuarioProvider>
  </StrictMode>,
)
