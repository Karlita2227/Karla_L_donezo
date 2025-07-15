import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

/**
 * GET /todos
 * Get all todos for the authenticated user
 */
router.get("/", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.sub, // Only return todos that belong to the logged-in user
      },
    });

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
    });
  }
});

/**
 * POST /todos
 * Create a new todo
 */
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const newTodo = await prisma.todo.create({
      data: {
        name,
        description,
        completed: false,
        userId: req.user.sub,
      },
    });

    res.status(201).json({
      success: true,
      todo: newTodo.id,
    });
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create new todo",
    });
  }
});

/**
 * PUT /todos/:todoId/completed
 * Mark a todo as completed
 */
router.put("/:todoId/completed", async (req, res) => {
  const todoId = Number(req.params.todoId);

  try {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed: true },
    });

    res.status(200).json({
      success: true,
      todo: todo.id,
    });
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
    });
  }
});

/**
 * DELETE /todos/:todoId
 * Delete a todo by ID
 */
router.delete("/:todoId", async (req, res) => {
  const todoId = Number(req.params.todoId);

  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });

    res.status(200).json({
      success: true,
      todo: todoId,
    });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
    });
  }
});

export default router;
