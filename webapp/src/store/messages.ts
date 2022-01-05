import { Module } from "vuex";
import { RootState } from "@/store";

const MESSAGE_TIMEOUT = 5000;

export interface Message {
  id: string;
  type: "success" | "warning" | "info";
  message: string;
  description?: string;
  actionLink?: any;
}

export interface MessagesState {
  messages: Message[];
}

export const messages: Module<MessagesState, RootState> = {
  namespaced: true,

  state: () => ({
    messages: [],
  }),

  mutations: {
    addMessage(state, message: Message) {
      state.messages.push(message);
    },

    removeMessage(state, messageId: string) {
      state.messages = state.messages.filter((m) => m.id != messageId);
    },
  },

  actions: {
    showMessage(context, message: Message) {
      context.commit("addMessage", message);

      setTimeout(() => {
        context.commit("removeMessage", message.id);
      }, MESSAGE_TIMEOUT);
    },
  },
};
