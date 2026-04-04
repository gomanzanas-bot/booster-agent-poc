import { Link } from 'react-router-dom'
import './Page.css'

export default function Home() {
  return (
    <section className="page hero">
      <h1>Welcome to GoManzanas</h1>
      <p className="subtitle">A proof-of-concept landing page built with React &amp; TypeScript.</p>
      <div className="cta-group">
        <Link to="/about" className="btn btn-primary">Learn more</Link>
        <Link to="/contact" className="btn btn-secondary">Get in touch</Link>
      </div>
    </section>
  )
}
