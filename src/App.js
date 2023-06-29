import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import axios from "axios";
import UserCard from "./components/UserCards";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div style={{ padding: "16px" }}>
      {loading ? (
        <Spin size="large" style={{ marginTop: "25%", marginLeft: "50%"}} />
      ) : (
        <Row  gutter={[4, 4]}>
          {users.map((user) => (
            <Col style={{marginBottom:'15px'}}  key={user.id} xs={24} sm={12} md={8} lg={6}>
              <UserCard  key={user.id} user={user} onDelete={handleDeleteUser} />
            </Col>
          ))}
        </Row>
      )}
      
    </div>
  );
};




export default App;
