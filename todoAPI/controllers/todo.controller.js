const { ObjectId } = require("mongodb");
const Todo = require("../models/todo.model");
const { text } = require("express");

async function getTodo(req, res, next) {
  let todos;
  try {
    todos = await Todo.getTodos();
  } catch (err) {
    return next(err);
  }
  res.json({
    todos,
  });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;
  let insertedId;
  const todo = new Todo(todoText);
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (err) {
    return next(err);
  }

  todo.id = insertedId.toString();
  res.json({
    message: "Added todo successfully",
    createdTodo: todo,
  });
}

async function updateTodo(req, res, next) {
  const id = req.params.id;
  const newText = req.body.text;
  console.log(id);
  const todo = new Todo(newText, id);
  console.log(todo);
  try {
    await todo.save();
  } catch (err) {
    return next(err);
  }
  res.json({
    message: "Todo successfully updated",
    updateTodo: todo,
  });
}

async function deleteTodo(req, res, next) {
  const id = req.params.id;
  const todo = new Todo(null, id);
  try {
    await todo.delete();
  } catch (err) {
    return next(err);
  }
  res.json({
    message: "Todo successfully deleted",
  });
}

module.exports = {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
