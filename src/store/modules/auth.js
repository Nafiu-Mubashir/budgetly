import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || null,
        user: null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        REMOVE_TOKEN(state) {
            state.token = null;
            localStorage.removeItem("token");
        },
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, userObj) {
            try {
                const response = await api.post("/login", userObj);
                commit("SET_TOKEN", response.token);
                commit("SET_USER", response.user);
                return response;
            } catch (error) {
                throw error;
            }
        },
        async logout({ commit }) {
            commit("REMOVE_TOKEN");
            commit("CLEAR_USER");
        },
        // async fetchUser({ commit }) {
        //     try {
        //         const response = await api.get("/user");
        //         commit("SET_USER", response);
        //     } catch (error) {
        //         throw error;
        //     }
        // },
        async register({commit}, userObj) {
            try {
                const response = await api.post("/register", userObj);
                return response
            } catch (error) {
                throw error;
            }
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        user: (state) => state.user,
    },
};
