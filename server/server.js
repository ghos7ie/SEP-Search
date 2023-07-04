require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

// takes json from req and converts it to normal js object
app.use(express.json());
app.use(cors());

/**************************
 **************************
 * API Routes
 **************************
 **************************/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server up and listening on port ${PORT}`)
});
