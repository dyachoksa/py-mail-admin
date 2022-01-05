import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import auth, { AuthState } from "./auth";
import { domains, DomainsState } from "./domains";
import { mailboxes, MailboxesState } from "@/store/mailboxes";
import { aliases, AliasesState } from "@/store/aliases";
import { Message, messages, MessagesState } from "@/store/messages";

export interface RootState {
  auth: AuthState;
  domains: DomainsState;
  mailboxes: MailboxesState;
  aliases: AliasesState;
  messages: MessagesState;
}

// define injection key
export const storeKey: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  getters: {
    isAuthenticated: (state) => state.auth.isAuthenticated,
    isAuthLoaded: (state) => state.auth.isLoaded,
  },

  actions: {
    showMessage(context, message: Message) {
      return context.dispatch("messages/showMessage", message);
    },
  },

  modules: {
    auth,
    domains,
    mailboxes,
    aliases,
    messages,
  },
});

export function useStore() {
  return baseUseStore(storeKey);
}
