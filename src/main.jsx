import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Desing/index.css'
import App from './Components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
