import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.listen(3000, () => {
    console.log("server running on port 3000")
});

console.log(process.env.MONGO_URI);

app.get('/products', (req, res) => {
    console.log('server running')
    res.sendStatus(200)
})
// SOFU44QiekWXyw2j