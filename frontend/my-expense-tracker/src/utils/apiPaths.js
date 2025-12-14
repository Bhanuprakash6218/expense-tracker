const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const API_PATHS = {
    AUTH: {
        LOGIN: `/api/v1/auth/login`,
        REGISTER: `/api/v1/auth/register`,
        GET_USER_INFO: `/api/v1/auth/getUser`,
    },
    DASHBOARD: {
        GET_DASHBOARD_DATA: `/api/v1/dashboard/`,
    },
    INCOME: {
        ADD_INCOME: `/api/v1/income/add`,
        GET_ALL_INCOME: `/api/v1/income/get`,
        DELETE_INCOME: (id) => `/api/v1/income/delete-income/${id}`,
        DOWNLOAD_INCOME_EXCEL: `/api/v1/income/download-excel`,
    },
    EXPENSE: {
        ADD_EXPENSE: `/api/v1/expense/add`,
        GET_ALL_EXPENSE: `/api/v1/expense/get`,
        DELETE_EXPENSE: (id) => `/api/v1/expense/delete-expense/${id}`,
        DOWNLOAD_EXPENSE_EXCEL: `/api/v1/expense/download-excel`,
    },
    IMAGE: {
        UPLOAD_IMAGE: `/api/v1/auth/upload-image`,
    }
};

export {
    BASE_URL,
    API_PATHS
}