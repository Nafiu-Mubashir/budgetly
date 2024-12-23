import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        budgets: [], // Centralized budget data
    },
    mutations: {
        SET_BUDGETS(state, budgets) {
            state.budgets = budgets;
        },
        ADD_BUDGET(state, budget) {
            state.budgets.push(budget);
        },
        UPDATE_BUDGET(state, updatedBudget) {
            const index = state.budgets.findIndex((b) => b.id === updatedBudget.id);
            if (index !== -1) {
                state.budgets.splice(index, 1, updatedBudget);
            }
        },
        DELETE_BUDGET(state, budgetId) {
            state.budgets = state.budgets.filter((b) => b.id !== budgetId);
        },
    },
    actions: {
        async fetchBudgets({ commit }) {
            try {
                const response = await api.get("/budgets");
                commit("SET_BUDGETS", response.budgets);
                return response.budgets;
            } catch (error) {
                throw error;
            }
        },
        async createBudget({ commit }, budgetData) {
            try {
                const response = await api.post("/budgets/create", budgetData);
                commit("ADD_BUDGET", response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateBudget({ commit }, budgetData) {
            try {
                const response = await api.put(`/budgets/${budgetData.id}`, budgetData);
                commit("UPDATE_BUDGET", response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteBudget({ commit }, budgetId) {
            try {
                await api.delete(`/budgets/${budgetId}`);
                commit("DELETE_BUDGET", budgetId);
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        budgets: (state) => state.budgets,
    },
};
