import { useEffect, useState } from "react";

function SubscribersList() {
  const [subscribers, setSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("email");
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 8;
  const [confirmDeleteIds, setConfirmDeleteIds] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/subscribers/`)
      .then((r) => r.json())
      .then((data) => {
        console.log("API Response:", data);
        setSubscribers(data);
      })
      .catch((error) => console.error("Error fetching subscribers:", error));
  }, []);
  

  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;

 // Filter based on search term
  const filteredSubscribers  = subscribers
    .filter((subscriber) =>
      subscriber[searchCategory] && subscriber[searchCategory].toLowerCase().includes(searchTerm.toLowerCase()))
  

  // Paginate filtered subscribers
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setConfirmDeleteIds([...confirmDeleteIds, id]);
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/subscribers/delete_subscriber/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Subscriber deleted successfully");
        setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
      } if (response.status === 400) {
        throw new Error("Invalid role. Only 'teacher' or 'student' can be deleted");
      }
      else {
        throw new Error("Failed to delete subscriber");
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error.message);
    }
    setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== id)); // Reset confirmDeleteId after deletion
  };


  const cancelDelete = (id) => {
    setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== id)); // Remove the canceled subscriber ID
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (event) => {
    setSearchCategory(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <div className="bg-gray-100 py-3" style={{
        marginBottom: "30px",
        marginTop: "10px",
        width: "100%",
      }}>
        <div className="bg-gray-200 py-3 mb-5" >
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-3 ">

            List of All Subscribers
            <hr
              class="border-t-2 border-red-700  mb-1 py-1"
              style={{ width: "15%", margin: "15px auto" }}
            />
          </h2>
        </div>

        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <select style={{ marginBottom: "10px" }} value={searchCategory} onChange={handleSelectChange}>
            <option value="email">Email</option>
          </select>
          <input style={{ marginBottom: "10px" }}
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleSearch}
          />

          <p>Items found: {filteredSubscribers.length}</p>
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                ID
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                EMAIL ADDRESS
              </th>

              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubscribers.map((subscriber) => (
              <tr key={subscriber.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {subscriber.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {subscriber.email}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button onClick={() => handleDelete(subscriber.id)}>Delete</button>
                  {confirmDeleteIds.includes(subscriber.id) && (
                    <>
                      <button onClick={() => confirmDelete(subscriber.id)}>
                        Confirm
                      </button>
                      <button onClick={() => cancelDelete(subscriber.id)}>Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <h3 className="px-2">Page </h3>
          {[...Array(Math.ceil(filteredSubscribers.length / subscribersPerPage)).keys()].map(
            (number) => (
              <button className="px-1" key={number} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscribersList;

