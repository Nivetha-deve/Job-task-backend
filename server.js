import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  mongooseConnect from "./couse-api/db-utils/mongoose-connection.js"
import coursesRouter from "./couse-api/courses.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/courses", coursesRouter);

// New route for handling contact form submission
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log({ name, email, message });
    res.status(200).send({ message: "Message received" });
});

// Connect to MongoDB
await mongooseConnect();

app.listen(PORT, () => {
    console.log("APP listening on port " + PORT);
});

