import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../pages/Navbar";

const UsersList = () => {
  const users = [
    {
      id: 1,
      name: "Alice",
    },
    {
      id: 2,
      name: "Bob",
    },
    {
      id: 3,
      name: "Charlie",
    },
  ];

  return (
    <div>
      <Navbar />
      {users.map((user, i) => (
        <li key={i} className="border bg-gray-100 w-56">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </div>
  );
};

export default UsersList;
