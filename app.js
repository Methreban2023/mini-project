const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dontenv = require("dotenv");
dontenv.config();
const postsRoutes = require("./api/movies/movies.routes");
const connectDb = require("./database");
const notfound = require("./middleware/notfound");
const errorhandle = require("./middleware/errorhandle");
const path = require("path");

connectDb();
//declare vars
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/movies", postsRoutes);

app.use(notfound);

app.use(errorhandle);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
