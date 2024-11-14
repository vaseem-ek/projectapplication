import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvid from './contextApI/ContextProvid.jsx'
import AuthContext from './contextApI/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvid>
        <AuthContext>
          <App />
        </AuthContext>
      </ContextProvid>
    </BrowserRouter>
  </StrictMode>,
)
