const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const role = 'isAdmin'
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json({Welcome: 'Connected to port' })
  })

// Middleware to check if the user is a Admin
const isAdmin = (req, res, next) => {
    const { role } = req.user; // Assuming role is part of the authenticated user object
  
    if (role === 'Admin') {
      next(); // If the role is 'Admin', continue to the next middleware/route handler
    } else {
      res.status(403).json({ error: 'Only teachers are allowed to perform this action' });
    }
  };
  
  // Example middleware to mock user authentication
  app.use((req, res, next) => {
    // Simulating user authentication, assigning a role to req.user
    req.user = {
      role: 'Admin' // Change this to 'Teacher' to grant access
    };
    next();
  });

// Create a new user
app.post('/users', async (req, res) => {
  const { username, email } = req.body;

  const newUser = await prisma.user.create({
    data: { username, email },
  });

  res.json(newUser);
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { username, email },
  });

  res.json(updatedUser);
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  res.json(deletedUser);
});
