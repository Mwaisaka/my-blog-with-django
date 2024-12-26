import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("fullname");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const [confirmDeleteIds, setConfirmDeleteIds] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) =>
      user[searchCategory].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    setConfirmDeleteIds([...confirmDeleteIds, userId]);
  };

  const confirmDelete = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/admin/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully");
        setUsers(users.filter((user) => user.user_id !== userId));
      } if (response.status === 400) {
        throw new Error("Invalid role. Only 'teacher' or 'student' can be deleted");
      }
      else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
    setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== userId)); // Reset confirmDeleteId after deletion
  };

  
  const cancelDelete = (userId) => {
    setConfirmDeleteIds(confirmDeleteIds.filter((id) => id !== userId)); // Remove the canceled user ID
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
    <section style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>
            <strong>
              <u>LIST OF ALL USERS</u>
            </strong>
          </h2>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={searchCategory} onChange={handleSelectChange}>
            <option value="fullname">Name</option>
            <option value="role">Role</option>
          </select>
          <p>Items found: {currentUsers.length}</p>
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                FULLNAME
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                AGE (Yrs)
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                GENDER
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ROLE</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.fullname}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.age}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.gender}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {user.role}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  {confirmDeleteIds.includes(user.id) && (
                    <>
                      <button onClick={() => confirmDelete(user.id)}>
                        Confirm
                      </button>
                      <button onClick={() => cancelDelete(user.id)}>Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Page</h3>
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(
            (number) => (
              <button key={number} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default UsersList;
