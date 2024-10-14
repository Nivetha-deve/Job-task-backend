import express from "express";
import Course from "./db-utils/models.js"

const router = express.Router();

// Create a course
router.post("/", async (req, res) => {
    const { title, description, duration } = req.body;
    const newCourse = new Course({ title, description, duration });
    await newCourse.save();
    res.status(201).send(newCourse);
});

// Get all courses
router.get("/", async (req, res) => {
    const courses = await Course.find();
    res.status(200).send(courses);
});

// Update a course by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
        return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send(updatedCourse);
});

// Delete a course by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        return res.status(404).send({ message: "Course not found" });
    }
    res.status(204).send();
});

export default router;


