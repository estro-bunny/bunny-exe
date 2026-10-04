import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)

// PWA: offline support + installability (production builds only)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'))
}
