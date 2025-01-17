import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        budgets: [], // Centralized budget data
        singleBudget: {},
    },
    mutations: {
        SET_BUDGETS(state, budgets) {
            state.budgets = budgets;
        },
        SET_SINGLE_BUDGET(state, singleBudget) {
            state.singleBudget = singleBudget;
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
                const sortedBudget = response.budgets.reverse()
                commit("SET_BUDGETS", sortedBudget);
                return response.budgets;
            } catch (error) {
                throw error;
            }
        },
        async fetchSingleBudget({ commit }, budgetId) {
            try {
                const response = await api.get(`/budgets/${budgetId}`);

                commit("SET_SINGLE_BUDGET", response.budget);
                return response.budget;
            } catch (error) {
                throw error;
            }
        },
        async createBudget({ commit }, budgetData) {
            try {
                const response = await api.post("/budgets/create", budgetData);
                commit("ADD_BUDGET", response);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async updateBudget({ commit }, {id, ...budgetData}) {
            try {
                const response = await api.patch(`/budgets/${id}`, budgetData);
                commit("UPDATE_BUDGET", response);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async deleteBudget({ commit }, budgetId) {
            try {
                const response = await api.delete(`/budgets/${budgetId}`);
                commit("DELETE_BUDGET", budgetId);
                
                return response;
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        budgets: (state) => state.budgets,
        singleBudget: (state) => state.singleBudget
    },
};
