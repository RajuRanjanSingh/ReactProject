import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4747/get');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleButtonClick = () => {
    fetchUsers();
  };

  return (
    <div>
      <h2>Leave Table</h2>
      <button onClick={handleButtonClick}>Fetch Your fill Data</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Leave_Type</th>
            <th>From_Date</th>
            <th>TO_DATE</th>
            <th>Team</th>
            <th>Upload_File</th>
            <th>Reporter</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.leave_type}</td>
              <td>{user.fromdate}</td>
              <td>{user.todate}</td>
              <td>{user.team_name}</td>
              <td>{user.file_upload}</td>
              <td>{user.reporter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
