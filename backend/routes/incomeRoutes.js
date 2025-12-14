const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/delete-income/:id", protect, deleteIncome);
router.get("/download-excel", protect, downloadIncomeExcel);

module.exports = router;
