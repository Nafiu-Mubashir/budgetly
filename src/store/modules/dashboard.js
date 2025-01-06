import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        summary: {}, // Centralized summary data
    },
    mutations: {
        SET_SUMMARY(state, summary) {
            state.summary = summary;
        },
        SET_MONTHLY_SUMMARY(state, monthlySummary) {
            state.monthlySummary = monthlySummary;
        },
    },
    actions: {
        async fetchSummary({ commit }) {
            try {
                const response = await api.get("/insights/summary");
                commit("SET_SUMMARY", response.data.summary);
                return response.data.summary;
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        summary: (state) => state.summary,
    },
};
