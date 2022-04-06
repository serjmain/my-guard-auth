const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./config/database');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = require('./config/swagger-config.json');
const specs = swaggerJsDoc(swaggerConfig);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRouter);


const PORT = process.env.PORT || 5000;
app.use("/authApi-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, async () => {
    await client.connect();
    console.log(`Server is running on http://localhost:${PORT}`)
})
