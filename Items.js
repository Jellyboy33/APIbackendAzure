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
    const items = await database.readItems();
    console.log(`items: ${JSON.stringify(items)}`);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a person
    const item = req.body;
    console.log(`item: ${JSON.stringify(item)}`);
    const rowsAffected = await database.createItem(item);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get the person with the specified ID
    const itemID = req.params.id;
    console.log(`itemID: ${itemmID}`);
    if (userID) {
      const result = await database.readItem(itemID);
      console.log(`items: ${JSON.stringify(result)}`);
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
    const itemID = req.params.id;
    console.log(`userID: ${itemID}`);

    if (!itemID) {
      res.status(404);
    } else {
      const rowsAffected = await database.deleteItem(itemID);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;