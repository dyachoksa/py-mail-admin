import { Module } from "vuex";
import { RootState } from "@/store";
import { api } from "@/api";
import { router } from "@/routes";
import { createSuccessMessage } from "@/helpers/messages";

export interface Mailbox {
  id: number;
  domain_id: number;
  domain_name: string;
  name: string;
  is_active: boolean;
  last_login_ip?: string;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MailboxData {
  domain_id: number;
  name: string;
  password?: string;
  is_active: boolean;
}

export interface MailboxesState {
  mailboxes: Mailbox[];
  mailbox: Mailbox | null;
  isLoaded: boolean;
}

export const mailboxes: Module<MailboxesState, RootState> = {
  state() {
    return {
      mailboxes: [],
      mailbox: null,
      isLoaded: false,
    };
  },

  namespaced: true,

  mutations: {
    setMailboxes(state, mailboxes: Mailbox[]) {
      state.mailboxes = mailboxes;
    },

    setLoaded(state, loaded: boolean) {
      state.isLoaded = loaded;
    },

    setMailbox(state, mailbox: Mailbox) {
      state.mailbox = mailbox;
    },

    add(state, mailbox: Mailbox) {
      state.mailboxes = [mailbox, ...state.mailboxes];
    },

    update(state, mailbox: Mailbox) {
      state.mailboxes = state.mailboxes.map((m) => (m.id == mailbox.id ? mailbox : m));
      state.mailbox = mailbox;
    },

    remove(state, mailboxId: number) {
      state.mailboxes = state.mailboxes.filter((m) => m.id != mailboxId);
      state.mailbox = null;
    },
  },

  actions: {
    async loadMailboxes(context, domainId) {
      try {
        context.commit("setLoaded", false);

        const res = await api.mailboxes.getMailboxes(domainId);

        context.commit("setMailboxes", res.result);
        context.commit("setLoaded", true);
      } catch (e) {
        console.warn(e);
      }
    },

    async loadMailbox(context, mailboxId: number) {
      try {
        const mailbox = await api.mailboxes.getMailbox(mailboxId);

        context.commit("setMailbox", mailbox);
      } catch (e) {
        console.warn(e);
      }
    },

    async create(context, data: MailboxData) {
      const mailbox = await api.mailboxes.create(data);

      context.commit("add", mailbox);

      const email = `${mailbox.name}@${mailbox.domain_name}`;

      await context.dispatch(
        "showMessage",
        createSuccessMessage(
          "Mailbox created",
          `Mailbox ${email} has been successfully created.`,
          { name: "mailbox", params: { mailboxId: mailbox.id } }
        ),
        { root: true }
      );
    },

    async update(context, { mailboxId, data }) {
      const mailbox = await api.mailboxes.update(mailboxId, data);

      context.commit("update", mailbox);

      const email = `${mailbox.name}@${mailbox.domain_name}`;

      await context.dispatch(
        "showMessage",
        createSuccessMessage(
          "Mailbox updated",
          `Mailbox ${email} has been successfully updated.`
        ),
        { root: true }
      );
    },

    async remove(context, mailboxId: number) {
      await api.mailboxes.remove(mailboxId);

      context.commit("remove", mailboxId);

      await context.dispatch(
        "showMessage",
        createSuccessMessage(
          "Mailbox removed",
          "Mailbox has been successfully removed."
        ),
        { root: true }
      );

      return router.push({ name: "mailboxes" });
    },
  },
};
