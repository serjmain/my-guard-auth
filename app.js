const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./config/database');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await client.connect();
    console.log(`Server is running on http://localhost:${PORT}`)
})
