const { Types } = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
    try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncomeAgg = await Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    console.log("Total Income Aggregate:", totalIncomeAgg);

    const totalExpenseAgg = await Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    console.log("Total Expense Aggregate:", totalExpenseAgg);

    const last60daysIncomeTransactions = await Income.find({
        userId: userId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60DaysTotal = last60daysIncomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);


    const last30daysExpenseTransactions = await Expense.find({
        userId: userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30DaysTotal = last30daysExpenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);

    const lastFiveTransactions = [
        ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) => ({ ...txn.toObject(), type: "income" }),
        ),
        ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) => ({ ...txn.toObject(), type: "expense" }),
        )
    ].sort((a, b) => b.date - a.date);

    res.status(200).json({
        totalBalance: (totalIncomeAgg[0] ? totalIncomeAgg[0].total : 0) - (totalExpenseAgg[0] ? totalExpenseAgg[0].total : 0),
        totalIncome: totalIncomeAgg[0] ? totalIncomeAgg[0].total : 0,
        totalExpense: totalExpenseAgg[0] ? totalExpenseAgg[0].total : 0,
        last30DaysExpenses: {
            total: expenseLast30DaysTotal,
            transactions: last30daysExpenseTransactions,
        },
        last60DaysIncomes: {
            total: incomeLast60DaysTotal,
            transactions: last60daysIncomeTransactions,
        },
        recentTransactions: lastFiveTransactions
    });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}