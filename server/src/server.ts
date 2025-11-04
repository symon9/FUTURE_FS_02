import mongoose from "mongoose";
import app from "./app";
import { PORT, MONGODB_URI } from "./config/env";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed. Exiting...", err);
    process.exit(1);
  });
