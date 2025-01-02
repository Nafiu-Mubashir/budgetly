# **Frontend Application for Budget and Transaction Management**

This project is the frontend implementation of a **Budget and Transaction Management System**, allowing users to manage budgets, track transactions, view financial summaries, and perform other related tasks.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Environment Variables](#environment-variables)
7. [API Integration](#api-integration)
8. [Contributing](#contributing)
<!-- 9. [License](#license) -->

---

## **Features**
- **Dashboard**:
  - View Total Income, Total Budget, Total Expenses, and Balance.
  - Visualize financial data using charts (e.g., income vs expenses).
- **Transaction Management**:
  - Add, edit, and view transactions.
  - Filter transactions based on category.
  - Display summary metrics like Total Transactions and Net Balance.
- **Budget Management**:
  - View Total Budgets, Remaining Budget, Used Budget, and Monthly Allocation.
  - Link transactions to specific budgets.
- **Responsive Design**:
  - Optimized for desktop and mobile devices.

---

## **Technologies Used**
- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **UI Library**: Tailwind CSS for responsive and modern styling.
- **State Management**: Vuex for managing global application state.
- **Charting Library**: [ApexCharts](https://apexcharts.com/) for dynamic data visualization.
- **API Calls**: Axios for HTTP requests.
- **Icons**: Lucide Vue for customizable icons.

---

## **Project Structure**
```plaintext
src/
├── components/         # Reusable components (e.g., input, modals, cards)
├── pages/              # Main pages (Dashboard, Transactions, Budgets)
├── store/              # Vuex store modules (state management)
├── utils/              # Helper functions and formatters
├── assets/             # Static assets (images, logos)
├── router/             # Application routes
├── App.vue             # Main application component
└── main.js             # Entry point for the application
```

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **npm** or **yarn**

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Nafiu-Mubashir/budgetly
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **Run the Development Server**
Start the local development server:
```bash
npm run dev
```
The application will be available at: `http://localhost:3000`

---

## **Available Scripts**
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run lint`**: Lints and fixes code issues.

---

## **Environment Variables**
Create a `.env` file in the root directory to manage environment-specific variables:
```plaintext
VITE_API_BASE_URL=https://personal-finance-manager-v1ha.onrender.com/api
```

---

## **API Integration**
The application interacts with a backend API for all functionalities. API endpoints are defined in `src/services/api.js`. Examples include:
- **Fetch Transactions**: `GET /transactions`
- **Add Transaction**: `POST /transactions`
- **Fetch Budgets**: `GET /budgets`
- **Add Budget**: `POST /budgets`

---

## **Contributing**
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature name'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

<!-- ## **License**
This project is licensed under the [MIT License](LICENSE). -->

---

## **Acknowledgements**
- [Vue.js Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ApexCharts Documentation](https://apexcharts.com/docs/)

For any issues or suggestions, feel free to open an issue on the repository.

--- 