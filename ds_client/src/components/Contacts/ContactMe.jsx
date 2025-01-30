import React, { useRef, useState } from "react";
import "./ContactMe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ContactMe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const charCountRef = useRef(null);
  const maxLength = 150;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const updateCharacterCount = () => {
    if (textareaRef.current && charCountRef.current) {
      const charCount = textareaRef.current.value.length;
      charCountRef.current.textContent = `${
        maxLength - charCount
      } characters left.`;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !subject || !message) {
      alert("All fields are required.");
      return;
    }

    // Create a new message
    const newMessage = {
      name,
      email,
      phoneNumber,
      subject,
      message,
      create_date: new Date().toISOString().split("T")[0], // Set current date
    };

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const response = await fetch(`${API_URL}/messages/add_message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Message sent successfully. Thank you!"); // Update the success message
        console.log("Added Message:", data);

        //Clear the form
        setName("");
        setEmail("");
        setPhoneNumber("");
        setSubject("");
        setMessage("");
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add message");
      }
    } catch (err) {
      console.error("Error adding message:", err.message);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-swipeUp contact-me-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
        {/* Contact Info */}
        <div className="info-card">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <p>Nairobi, Kenya</p>
        </div>
        <div className="info-card">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <p>+254 *********</p>
          <span>Monday - Friday, 7am - 5pm</span>
        </div>
        <div className="info-card">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <p>
            <a href="mailto:example@gmail.com">example@gmail.com</a>
          </p>
          <span>Contact me anytime!</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-container">
        <h2 className="mb-2">Get In Touch</h2>
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactMe;
