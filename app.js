import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import appController from './appController.js'
import express from 'express'
const app = express();
const port = process.env.PORT || 8080;

appController(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));