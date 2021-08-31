const express = require('express');
const cors = require('cors');

const app = express();

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Mary', lastName: 'Jane'},
  ];

  res.json(customers);
});
const Jora = 2;
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
