import { useState, FormEvent } from 'react'
import './Page.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // In a real app you'd send this data to a backend or email service.
    // For now we just show a thank-you message.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="page">
        <h1>Thanks!</h1>
        <p>We got your message and will be in touch soon.</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>Contact</h1>
      <p>Fill in the form below and we'll get back to you.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" required placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea name="message" required rows={5} placeholder="How can we help?" />
        </label>
        <button type="submit" className="btn btn-primary">Send message</button>
      </form>
    </section>
  )
}
