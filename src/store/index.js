import { createStore } from "vuex";
import auth from "./modules/auth";
import budget from "./modules/budget";
import transaction from "./modules/transaction";
import dashboard from "./modules/dashboard";

export const store = createStore({
    modules:{
        auth,
        budget,
        transaction,
        dashboard,
    }
})