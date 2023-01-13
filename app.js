const express = require('express');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
const app = express();
const customerRoutes = require('./routes/customerRoute')
// const orderRoutes = require('./routes/orderRoute')
const connectDB = require('./dbConnection/connect')
require('dotenv').config()

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api/v1/customer', customerRoutes)
// app.use('/api/v1/order', orderRoutes)

const port = process.env.PORT || 5050;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on ${port}...`))
    } catch (error) {
        console.log(error);
    }
}
start()