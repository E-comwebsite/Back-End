const express = require("express");
const connection = require("./config/connectdb");
const AuthRoute = require("./Routes/User.Route")
require("dotenv").config();




const cors = require("cors");
const app = express();



app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/upload", express.static("src/fileStorage"))
connection();

app.use("/userauth", AuthRoute);



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
