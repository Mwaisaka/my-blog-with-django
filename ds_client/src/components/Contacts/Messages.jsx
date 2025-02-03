import React, { useState, useEffect } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage"), 10) || 1 // Retrieve saved page or default to 1
  );
  const [likedMessages, setLikedMessages] = useState({});
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    PhoneNumber: "",
    subject: "",
    message: "",
  });
  const messagesPerPage = 3;
  const API_URL = import.meta.env.VITE_API_URL;

  // Date formatting function
  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "Invalid date"; // Handle invalid dates
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  useEffect(() => {
    console.log("useEffect triggered");
    // Fetch messages from API
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/messages/`);
        const data = await response.json();

        console.log("Messages fetched", data);
        // Sort messages by date in descending order
        setMessages(
          data.sort((b, a) => new Date(a.create_date) - new Date(b.create_date))
        );

        console.log("Messages after sorting", data);

        // Initialize likedMessages state
        const initialLikes = {};
        data.forEach((message) => {
          initialLikes[message.id] = false; // Default: not liked
        });
        setLikedMessages(initialLikes);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    // Save current page to localStorage whenever it changes
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const toggleReadMore = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //Delete blog message
  const handleDeleteMessage = async (id) => {
    // Ask the user for confirmation
    const confirmDeleteBlog = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (confirmDeleteBlog) {
      //Proceed to delete the message
      try {
        const response = await fetch(
          `${API_URL}/messages/delete_message/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          alert("Message not deleted!");
          throw new Error(
            `Failed to delete blog message: ${response.statusText}`
          );
        }
        alert("Message deleted successfully!");
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== id)
        );
      } catch (error) {
        console.error("Error deleting blog message:", error);
      }
    } else {
      //Do noting and retain the message
      alert("Message not deleted!");
      return;
    }
  };

  const handleEditClick = (message) => {
    setEditingMessageId(message.id);
    setEditFormData({
      title: message.title,
      category: message.category,
      content: message.content,
      reading_time: message.reading_time,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSave = async (id) => {
    try {
      const response = await fetch(`${API_URL}/messages/edit_message/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to update blog message: ${response.statusText");
      }
      const updatedMessage = await response.json();
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? updatedMessage : message
        )
      );
      setEditingMessageId(null);
    } catch (error) {
      console.error("Error updating blog message :", error);
    }
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
  };

  console.log("Messages", messages);

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  console.log("Filtered messages after search query", filteredMessages);

  const currentMessages = filteredMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  console.log("Current messages after search query", currentMessages);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="animate-swipeUp min-h-screen flex justify-center items-center mt-8">
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-16">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">Manage My Messages</h2>
          <input
            type="text"
            placeholder="Search messages by name or subject..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 p-2 rounded w-full mt-4"
          />
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 bg-gray-100 p-6 rounded-lg shadow-lg">
            {currentMessages.length > 0 ? (
              currentMessages.map((msg) => {
                const isExpanded = expandedMessages[msg.id];
                const shouldTruncate = msg.message.length > 100;
                const areCommentsVisible = commentsVisible[msg.id];
                const isLiked = likedMessages[msg.id];

                return (
                  <div
                    key={msg.id}
                    className="rounded overflow-hidden shadow-lg p-4 bg-white mb-8"
                  >
                    {editingMessageId === msg.id ? (
                      <div>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          placeholder="Title"
                          className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                          type="text"
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditChange}
                          placeholder="Category"
                          className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <textarea
                          name="content"
                          value={editFormData.content}
                          onChange={handleEditChange}
                          placeholder="Content"
                          className="border border-gray-300 p-2 rounded w-full mb-2"
                          rows="5"
                        />
                        <input
                          type="number"
                          name="reading_time"
                          value={editFormData.reading_time}
                          onChange={handleEditChange}
                          placeholder="Reading Time"
                          className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <div className="flex space-x-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md"
                            onClick={() => handleEditSave(msg.id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-3 py-1 rounded-md"
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">
                          From : {msg.name}
                        </h3>
                        <h3 className="text-m font-normal">
                          <strong>Subject:</strong>
                          {"   "}
                          {msg.subject}
                        </h3>
                        <p className="text-gray-700 mt-2">
                          {" "}
                          <strong>Message:</strong>
                          <i>
                            {"   "}
                            {shouldTruncate && !isExpanded
                              ? `${msg.message.slice(0, 100)}...`
                              : msg.message}
                          </i>
                        </p>
                        {shouldTruncate && (
                          <button
                            className="text-blue-600 mt-2 underline"
                            onClick={() => toggleReadMore(msg.id)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                        <p className="text-gray-700 mt-2">
                          Sent on: {formatDate(msg.create_date)}
                        </p>

                        {/*Edit and Delete a blog message */}
                        <div className="mt-4 flex space-x-2">
                          {/* <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                            onClick={() => handleEditClick(msg)}
                          >
                            Edit Message
                          </button> */}
                          <button
                            className="bg-red-500 text-white px-1.5 py-0.5 rounded-md"
                            onClick={() => {
                              {
                                handleDeleteMessage(msg.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 italic mt-8">
                No results found for "{searchQuery}".
              </div>
            )}
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p className="text-gray-700">
                Page {currentPage} of {totalPages}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
