import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        transactions: [], // Centralized transaction data
    },
    mutations: {
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions;
        },
        ADD_TRANSACTION(state, transaction) {
            state.transactions.push(transaction);
        },
        UPDATE_TRANSACTION(state, updatedTransaction) {
            const index = state.transactions.findIndex((b) => b.id === updatedTransaction.id);
            if (index !== -1) {
                state.transactions.splice(index, 1, updatedTransaction);
            }
        },
        DELETE_TRANSACTION(state, transactionId) {
            state.transactions = state.transactions.filter((b) => b.id !== transactionId);
        },
    },
    actions: {
        async fetchTransactions({ commit }) {
            try {
                const response = await api.get("/transactions");
                commit("SET_TRANSACTIONS", response.transactions);
                return response.transactions;
            } catch (error) {
                throw error;
            }
        },
        async createTransaction({ commit }, transactionData) {
            try {
                const response = await api.post("/transactions", transactionData);
                commit("ADD_TRANSACTION", response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateTransaction({ commit }, transactionData) {
            try {
                const response = await api.put(`/transactions/${transactionData.id}`, transactionData);
                commit("UPDATE_TRANSACTION", response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteTransaction({ commit }, transactionId) {
            try {
                await api.delete(`/transactions/${transactionId}`);
                commit("DELETE_TRANSACTION", transactionId);
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        transactions: (state) => state.transactions,
    },
};
