import React, { useState } from "react";
import { Card, Modal, Form, Input} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import "./usercards.css";

const UserCard = ({ user, onDelete }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [form] = Form.useForm();

  const { id, name, email, phone, website } = editedUser;

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        setEditedUser((prevUser) => ({
          ...prevUser,
          ...values,
        }));
        setIsEditModalVisible(false);
        return values; // Return the form values if validation succeeds
      })
      .catch((error) => {
        console.log('Form validation failed:', error);
        return ; // Reject the promise if validation fails
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  const handleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <Card
      style={{ width: "95%", height: "40%" }}
      cover={
        <img
          src={`https://avatars.dicebear.com/v2/avataaars/${editedUser.username}.svg?options[mood][]=happy`}
          alt="User Avatar"
          style={{ width: "200px", height: "200px" }}
        />
      }
      actions={[
        <HeartFilled
          key="favorite"
          style={{
            color: isFavorite ? "red" : "#828485",
            fontSize: "20px",
            backgroundColor: "transparent",
            hover:"None",
            padding: 0,
            margin: 0,
          }}
          onClick={handleFavorite}
        />,
        <EditOutlined
          key="edit"
          style={{ fontSize: "20px" }}
          onClick={handleEdit}
        />,
        <DeleteFilled
          key="delete"
          style={{ fontSize: "20px" }}
          onClick={handleDelete}
        />,
      ]}
    >
      <h3 style={{ margin: "0 0 5px 10px" }}> {name}</h3>
      <p className="info">
        <MailOutlined className="icon" /> {email}
      </p>
      <p className="info">
        <PhoneOutlined className="icon" />
        {phone}
      </p>
      <p style={{ cursor: "pointer" }} className="info">
        <GlobalOutlined className="icon" /> https://{website}
      </p>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form}>
          <Form.Item
            label="Name"
            name="name"
            initialValue={editedUser.name}
            rules={[
              { required: true, message: 'Please enter the name' },
              { whitespace: true, message: 'Please enter a valid name' },
            ]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={editedUser.email}
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            initialValue={editedUser.phone}
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            initialValue={editedUser.website}
            rules={[
              { required: true, message: 'Please enter the website URL' },
             
            ]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};


export default UserCard;
