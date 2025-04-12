import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PizzaApp from './PizzaApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PizzaApp />
  </StrictMode>,
)
