import moment from "moment";

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const getInitials = (fullname) => {
    if (!fullname) return "";

    const words = fullname.split(" ");
    let initials = "";
    for (let i=0; i< Math.min(words.length , 2); i++) {
        initials +=words[i][0]
    }

    return initials.toUpperCase();
}

const addThousandsSeparator = (num) => {
    if (num === null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

const prepareExpenseBarChartData = (expenses = []) => {
    // Group by formatted date (DD MMM) and collect all items for that date
    const sortedData = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    const map = {};
    sortedData.forEach((item) => {
        const dateKey = item?.date ? moment(item.date).format("DD MMM") : "Unknown";
        if (!map[dateKey]) {
            map[dateKey] = { date: dateKey, amount: 0, items: [] };
        }
        map[dateKey].amount += Number(item?.amount) || 0;
        map[dateKey].items.push(item);
    });

    return Object.values(map);
}

const prepareIncomeBarChartData = (incomes = []) => {
    // Group by formatted date (DD MMM) and collect all items for that date
    const sortedData = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
    const map = {};
    sortedData.forEach((item) => {
        const dateKey = item?.date ? moment(item.date).format("DD MMM") : "Unknown";
        if (!map[dateKey]) {
            map[dateKey] = { date: dateKey, amount: 0, items: [] };
        }
        map[dateKey].amount += Number(item?.amount) || 0;
        map[dateKey].items.push(item);
    });

    return Object.values(map);
}

const prepareExpenseLineChartData = (expenses = []) => {
     const sortedData = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    const map = {};
    sortedData.forEach((item) => {
        const dateKey = item?.date ? moment(item.date).format("DD MMM") : "Unknown";
        if (!map[dateKey]) {
            map[dateKey] = { date: dateKey, amount: 0, items: [] };
        }
        map[dateKey].amount += Number(item?.amount) || 0;
        map[dateKey].items.push(item);
    });

    return Object.values(map);
}

export {
    validateEmail,
    getInitials,
    addThousandsSeparator,
    prepareExpenseBarChartData,
    prepareIncomeBarChartData,
    prepareExpenseLineChartData
}