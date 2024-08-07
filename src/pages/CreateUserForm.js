import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../graphql/mutations';

const CreateUserForm = () => {
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const client = generateClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await client.graphql({
        query: createUser,
        variables: { account, username, image }
      });
      setUser(result.data.createUser);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account ID"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>
      {user && (
        <div>
          <p>Account: {user.account}</p>
          <p>Username: {user.username}</p>
          <p>Image: {user.image}</p>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CreateUserForm;
