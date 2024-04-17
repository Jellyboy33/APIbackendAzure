import express from 'express';
import { config } from './config.js';
import Database from './database.js';

// Import App routes
import item from './Items.js';
import od from './OrderDetails.js';
import user from './User.js';
import openapi from './openapi.js';

const port = process.env.PORT || 3000;

const app = express();

// Development only - don't do in production
// Run this to create the table in the database
if (process.env.NODE_ENV === 'development') {
  const database = new Database(config);
  database
    .executeQuery(
    
    )
    .then(() => {
      console.log('All Items');
    })
    .catch((err) => {
      // Table may already exist
      console.error(`Error finding items: ${err}`);
    });
}

// Connect App routes
app.use('/api-docs', openapi);
app.use('/users', user);
app.use('/items', item);
app.use('/OrderDetails', od);
app.use('*', (_, res) => {
  res.redirect('/api-docs');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});