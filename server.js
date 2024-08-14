// src/backend/server.js
const express = require('express');
const { updateUser } = require('./src/backend/api'); // Importa a função de update
require('./src/backend/aws-config'); // Configurações da AWS
require('./src/backend/dynamoose-config'); // Configurações do Dynamoose

const app = express();
const port = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// Rota para atualizar o usuário
app.post('/update-user', async (req, res) => {
  const { address, username, image } = req.body;

  try {
    await updateUser(address, { username, image });
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
