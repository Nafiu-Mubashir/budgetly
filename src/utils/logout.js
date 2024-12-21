import { useRouter } from "vue-router";
import { useStore } from "vuex";

export const useLogout = () => {
  const router = useRouter();
  const store = useStore();

  const logout = () => {
    store.dispatch("auth/logout");
    router.push("/login");
  };

  return logout;
};
