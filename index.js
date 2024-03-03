const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');  // Add this line
const port = process.env.PORT || 5000;
const routerPath = require('./routes/openAiRoutes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/openai', routerPath );

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
