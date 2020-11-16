const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'))

const port = process.env.PORT || 3001;
dotenv.config();

app.use(cors({
  origin: [process.env.FRONTEND],
  credentials: true,
}));

app.use(bodyParser.json());

app.use(require('./routes'));

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
