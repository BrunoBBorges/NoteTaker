const express = require('express');
const apiRoutes = require('./Routes/apiRoutes')
const htmlRoutes = require('./Routes/htmlRoutes')

const PORT = process.env.PORT || 3000;
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server on the designated port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
