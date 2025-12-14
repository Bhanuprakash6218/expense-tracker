const xlsx = require('xlsx');
const Expense = require('../models/Expense');


const addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body || {};

        if (!category || !amount) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json({ newExpense });
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
}

const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
        const expense = await Expense.find({ userId }).sort({date: -1});
        res.json(expense);
  } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
}   


const deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete({_id: req.params.id});
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
}

const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
    try {
        const expenseData = await Expense.find({ userId }).sort({date: -1});

        const worksheetData = expenseData.map((expense) => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: expense.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(worksheetData);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Error downloading expense data", error: error.message });
    }
}

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
};
