import React, { useRef, useState } from "react";
import "./ContactMe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const charCountRef = useRef(null);
  const maxLength = 150;

  const updateCharacterCount = () => {
    if (textareaRef.current && charCountRef.current) {
      const charCount = textareaRef.current.value.length;
      charCountRef.current.textContent = `${maxLength - charCount} characters left.`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      alert("Message submitted successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setPhone("");
      setMessage("");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="contact-me-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Contact Info */}
        <div className="info-card">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <p>Nairobi, Kenya</p>
        </div>
        <div className="info-card">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <p>+254 716-461951</p>
          <span>Monday - Friday, 7am - 5pm</span>
        </div>
        <div className="info-card">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <p>
            <a href="mailto:frankkashere@gmail.com">frankkashere@gmail.com</a>
          </p>
          <span>Contact me anytime!</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-container">
        <h2>Get In Touch</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Message (150 characters max)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={maxLength}
              ref={textareaRef}
              onInput={updateCharacterCount}
              required
            ></textarea>
            <small ref={charCountRef}>{maxLength} characters left.</small>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
