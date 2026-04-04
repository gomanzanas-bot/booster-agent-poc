import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// HashRouter puts the route after a # in the URL (e.g. /#/about).
// This means the browser never actually asks the server for /about —
// it only ever requests the base URL, so GitHub Pages always serves
// index.html and refreshing any page works perfectly.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
