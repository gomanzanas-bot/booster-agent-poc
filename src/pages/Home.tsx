import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <span className="badge">Now in beta &rarr;</span>
          <h1>Build smarter tools.<br />Ship faster products.</h1>
          <p className="hero-sub">
            GoManzanas is the all-in-one platform that helps product teams go
            from rough idea to live feature — without the usual chaos.
          </p>
          <div className="cta-group">
            <Link to="/contact" className="btn btn-light">Get started free</Link>
            <Link to="/about" className="btn btn-ghost">Learn more &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────── */}
      <section className="stats">
        <div className="stat"><strong>12,000+</strong><span>teams onboarded</span></div>
        <div className="stat"><strong>99.9%</strong><span>uptime SLA</span></div>
        <div className="stat"><strong>3&times; faster</strong><span>time to ship</span></div>
        <div className="stat"><strong>SOC 2</strong><span>certified</span></div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="features">
        <div className="features-inner">
          <h2>Everything your team needs</h2>
          <p className="section-sub">One platform. Zero duct tape.</p>
          <div className="cards">
            <div className="card">
              <div className="card-icon">&#9881;</div>
              <h3>Automated workflows</h3>
              <p>Connect your tools and let GoManzanas handle the boring parts — deploys, notifications, status updates, all of it.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#128202;</div>
              <h3>Real-time analytics</h3>
              <p>Know what's working the moment it happens. Custom dashboards, funnel views, and anomaly alerts built in.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#128101;</div>
              <h3>Built for teams</h3>
              <p>Fine-grained roles, audit logs, and SSO so your whole org can move fast without stepping on each other.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#128274;</div>
              <h3>Enterprise security</h3>
              <p>SOC 2 Type II, end-to-end encryption, and data residency options — security your legal team will actually like.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#9889;</div>
              <h3>Instant integrations</h3>
              <p>GitHub, Slack, Jira, Figma, Linear — plug in what you already use. Up and running in under 10 minutes.</p>
            </div>
            <div className="card">
              <div className="card-icon">&#127775;</div>
              <h3>AI-powered suggestions</h3>
              <p>Surface blockers before they become problems. GoManzanas learns how your team works and gets smarter every sprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ─────────────────────────────── */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <h2>Loved by teams everywhere</h2>
          <div className="quotes">
            <blockquote>
              <p>&ldquo;We cut our release cycle from two weeks to two days. I don&rsquo;t know how we shipped before GoManzanas.&rdquo;</p>
              <cite>— Sara K., VP Engineering at Lumio</cite>
            </blockquote>
            <blockquote>
              <p>&ldquo;Finally a tool that doesn&rsquo;t require a PhD to set up. Our PMs love it as much as our engineers.&rdquo;</p>
              <cite>— Diego M., CTO at Stackbeam</cite>
            </blockquote>
            <blockquote>
              <p>&ldquo;The analytics alone are worth the price. We caught a critical regression on day one that would have cost us thousands.&rdquo;</p>
              <cite>— Priya N., Head of Product at Driftly</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="cta-section">
        <h2>Ready to move faster?</h2>
        <p>Join thousands of teams already shipping with GoManzanas. Free to start, no credit card required.</p>
        <Link to="/contact" className="btn btn-primary-dark">Start for free</Link>
      </section>

    </div>
  )
}
