const xlsx = require('xlsx');
const Income = require('../models/Income');


const addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body || {};

        if (!source || !amount) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json({ newIncome });
    } catch (error) {
        res.status(500).json({ message: "Error adding income", error: error.message });
    }
}

const getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
        const income = await Income.find({ userId }).sort({date: -1});
        res.json(income);
  } catch (error) {
        res.status(500).json({ message: "Error fetching incomes", error: error.message });
  }
}   


const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        await Income.findOneAndDelete({_id: id});
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting income", error: error.message });
    }
}

const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
    try {
        const incomeData = await Income.find({ userId }).sort({date: -1});

        const worksheetData = incomeData.map((income) => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(worksheetData);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Error downloading income data", error: error.message });
    }
}

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel
};
