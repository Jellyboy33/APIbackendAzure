import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

// Development only - don't do in production
console.log(config);

// Create database object
const database = new Database(config);

router.post('/{user}', async (req, res) => {
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