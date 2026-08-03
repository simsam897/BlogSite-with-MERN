import mongoose from "mongoose";
import app from "./index.js";
import { db } from "./src/db/db.js";

db();
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`local host is running on port ${process.env.PORT}`);
});
