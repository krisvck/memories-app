//Starting point of our server application

//Import our dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import postRoutes from "./routes/posts.js";

//initialize the application
const app = express();
dotenv.config();

//because bodyParser is deprecated
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

//Connect our server application to a real database
//We are going to use mongo db
// https://www.mongodb.com/cloud/atlas
const PORT = process.env.PORT || 5000;

//use mongoose to connect to database, the object is so that we dont get warmings
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// make sure we dont get any warmings in the console. it's deprecated now and no longer needed
//mongoose.set("useFindAndModify", false);
