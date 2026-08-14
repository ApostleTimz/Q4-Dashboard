import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Q4Wallet from '../Q4Wallet.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Q4Wallet />
  </StrictMode>,
)
