const Expense = require('../models/Expense');
const protect = require("../middleware/authMiddleware");
const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            ...req.body,
            user: req.user.userId
        });
        console.log("req.user expense:", expense);
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);
        console.log("Inside createExpense");
        console.log(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const createExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Inside createExpenseById");
        console.log(expense);
        if (!expense) {
            return res.status(404).json({ message: "ExpenseID not found" });
        }
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message + "Enter" });
    }
};
const readExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId });
        //throw new Error("Error while fetching expenses");
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
};
const readExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = { createExpense, readExpense, createExpenseById, readExpenseById, deleteExpenseById };