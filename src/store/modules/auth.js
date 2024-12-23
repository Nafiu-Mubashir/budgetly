import api from "@/services/api";

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || null,
        email: null, // Store email of the logged-in user
        user: localStorage.getItem("user") ||  null,
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
        SET_EMAIL(state, email) {
            state.email = email;
            localStorage.setItem("email", email);
        },
        CLEAR_EMAIL(state) {
            state.email = null;
            localStorage.removeItem("email");
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", user);
        },
        CLEAR_USER(state) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, userObj) {
            try {
                const response = await api.post("/auth/login", userObj);
                commit("SET_TOKEN", response.token); // Save the token
                commit("SET_EMAIL", userObj.email); // Save the email
                return response;
            } catch (error) {
                throw error;
            }
        },
        async logout({ commit }) {
            commit("REMOVE_TOKEN");
            commit("CLEAR_EMAIL");
            commit("CLEAR_USER");
        },
        async fetchUser({ commit, state }) {
            try {
                if (!state.email) throw new Error("Email is missing for the logged-in user");
                const response = await api.get(`/auth/user/${state.email}`, {
                    headers: { Authorization: `Bearer ${state.token}` }, // Include token for secure request
                });
                console.log(response.user);
                
                commit("SET_USER", response.user.username);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async register({ commit }, userObj) {
            try {
                const response = await api.post("/auth/register", userObj);
                return response;
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        user: (state) => state.user,
    },
};
