import React, { useState, useEffect } from "react";

function Subscribe() {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    setError(null); // Reset error state

    // Validate email
    if (!isValidEmail) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSending(true);

    fetch("http://127.0.0.1:8000/newsletter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Email already exists.");
        }
        return response.json();
      })
      .then(() => {
        setMessage(
          "Thanks for contacting us! We will be in touch with you soon."
        );
        setEmail("");
        setIsValidEmail(false); // Reset the email validity
      })
      .catch((error) => {
        if (error.message === "Email already exists.") {
          setError("Email already exists. Please enter a different email.");
        } else {
          setError("An error occurred while subscribing. Please try again.");
        }
      })
      .finally(() => {
        setIsSending(false); // Reset sending state
      });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 3 seconds
      }, 3000);

      // Cleanup the timer if the component unmounts before the timer completes
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div
      className="rounded overflow-hidden shadow-none px-6 py-1"
      style={{
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      
       
        <h3 className="text-gray-600">
        Want to stay updated? Subscribe to my blog for the latest posts and insights!
        
        </h3>
     

      <div className="flex justify-center mb-1 mt-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Please enter your email address to subscribe to my posts..."
          className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-lg"
        />
        <button
          onClick={handleSubscribe}
          className={`${
            isSending ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-800"
          } text-white px-4 py-2 rounded-lg transition`}
          style={{ marginLeft: "10px" }}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <div className="text-center text-green-600 mt-4">{message}</div>
      )}
      {error && <div className="text-center text-red-600 mt-4">{error}</div>}
    </div>
  );
}

export default Subscribe;