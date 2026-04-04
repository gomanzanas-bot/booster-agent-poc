import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  return (
    <div className="app">
      {/* Navigation bar shown on every page */}
      <Nav />

      {/* Swap out the page content based on the URL */}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}
