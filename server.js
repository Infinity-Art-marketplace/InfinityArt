const express = require('express');
const { createUser } = require('./src/backend/createUser');
const { updateUser } = require('./src/backend/updateUser');
const { getUser } = require('./src/backend/getUser'); // Adicione a importação da função getUser

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Endpoint para criar ou atualizar usuário
app.post('/create-user', async (req, res) => {
  const { address, username, image, banner, description, createdAt } = req.body;
  try {
    await createUser(address, { username, image, banner, description, createdAt });
    res.status(200).send('User created or updated successfully');
  } catch (error) {
    res.status(400).send('Error creating or updating user: ' + error.message);
  }
});

// Endpoint para atualizar usuário
app.post('/update-user', async (req, res) => {
  const { address, username, image, banner, description, createdAt } = req.body;
  try {
    await updateUser(address, { username, image, banner, description, createdAt });
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send('Error updating user: ' + error.message);
  }
});

// Novo endpoint para recuperar um usuário
app.get('/get-user/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const user = await getUser(address);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving user: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

