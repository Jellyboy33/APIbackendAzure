import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

// Development only - don't do in production
console.log(config);

// Create database object
const database = new Database(config);

router.get('/', async (_, res) => {
  try {
    // Return a list of persons
    const users = await database.readUsers();
    console.log(`users: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a person
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.createUser(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get the person with the specified ID
    const userID = req.params.id;
    console.log(`userID: ${userID}`);
    if (userID) {
      const result = await database.readUser(userID);
      console.log(`users: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete the person with the specified ID
    const userID = req.params.id;
    console.log(`userID: ${userID}`);

    if (!userID) {
      res.status(404);
    } else {
      const rowsAffected = await database.deleteUser(userID);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/orderHistory/:user', async (req, res) => {
  try {
    // Return a list of persons
    const userName = req.params.user;

    console.log(`userName: ${userName}`);
    if (userName) {
      const result = await database.orderHistory(userName);
      console.log(`orders: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post('/OrderDetails/:user', async (req,res) => {
  const user = req.params.user;
    try {
     // Create a person
      const orderList = req.body;
      console.log(`orders: ${JSON.stringify(orderList)}`);
      const rowsAffected = await database.createOrder(orderList,user);
      res.status(201).json({ rowsAffected });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

export default router;