import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Reset browser default margin/padding so our full-height layout works cleanly
const style = document.createElement('style')
style.textContent = `*, *::before, *::after { box-sizing: border-box; } body { margin: 0; }`
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
