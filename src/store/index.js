import { createStore } from "vuex";
import auth from "./modules/auth";
import budget from "./modules/budget";

export const store = createStore({
    modules:{
        auth,
        budget,
    }
})