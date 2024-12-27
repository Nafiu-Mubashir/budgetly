import { createStore } from "vuex";
import auth from "./modules/auth";
import budget from "./modules/budget";
import transaction from "./modules/transaction";

export const store = createStore({
    modules:{
        auth,
        budget,
        transaction,
    }
})