import { Module } from "vuex";
import { RootState } from "@/store";
import { api } from "@/api";
import { router } from "@/routes";

export interface User {
  id: number;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  isLoaded: boolean;
  isAuthenticated: boolean;
  currentUser: null | User;
  error: null | string;
}

const auth: Module<AuthState, RootState> = {
  state() {
    return {
      isLoaded: false,
      isAuthenticated: false,
      currentUser: null,
      error: null,
    };
  },

  namespaced: true,

  mutations: {
    setAuthenticated(state, payload: boolean) {
      state.isAuthenticated = payload;
    },

    setLoaded(state, payload: boolean) {
      state.isLoaded = payload;
    },

    setCurrentUser(state, payload: User | null) {
      state.currentUser = payload;
    },

    setError(state, payload: null | string) {
      state.error = payload;
    },
  },

  actions: {
    async load(context) {
      try {
        const currentUser = await api.auth.getCurrentUser();

        context.commit("setAuthenticated", true);
        context.commit("setCurrentUser", currentUser);
      } catch (err) {
        context.commit("setAuthenticated", false);
        context.commit("setCurrentUser", null);
        await router.push({ name: "login" });
      } finally {
        context.commit("setLoaded", true);
      }
    },

    async login(context, data: LoginData) {
      try {
        context.commit("setError", null);

        const res = await api.auth.getToken(data);

        context.commit("setAuthenticated", true);
        context.commit("setCurrentUser", res.result);

        return router.push({ name: "dashboard" });
      } catch (err) {
        context.commit("setError", (err as Error).toString());
      }
    },
  },
};

export default auth;
