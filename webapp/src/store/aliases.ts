import { Module } from "vuex";
import { RootState } from "@/store";
import { api } from "@/api";
import { router } from "@/routes";
import { createSuccessMessage } from "@/helpers/messages";

export interface Alias {
  id: number;
  domain_id: number;
  domain_name: string;
  source: string;
  destination: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AliasData {
  domain_id: number;
  source: string;
  destination: string;
  is_active: boolean;
}

export interface AliasesState {
  aliases: Alias[];
  alias: Alias | null;
  isLoaded: boolean;
}

export const aliases: Module<AliasesState, RootState> = {
  state() {
    return {
      aliases: [],
      alias: null,
      isLoaded: false,
    };
  },

  namespaced: true,

  mutations: {
    setAliases(state, aliases: Alias[]) {
      state.aliases = aliases;
    },

    setLoaded(state, loaded: boolean) {
      state.isLoaded = loaded;
    },

    setAlias(state, alias: Alias) {
      state.alias = alias;
    },

    add(state, alias: Alias) {
      state.aliases = [alias, ...state.aliases];
    },

    update(state, alias: Alias) {
      state.aliases = state.aliases.map((a) => (a.id == alias.id ? alias : a));
      state.alias = alias;
    },

    remove(state, aliasId: number) {
      state.aliases = state.aliases.filter((m) => m.id != aliasId);
      state.alias = null;
    },
  },

  actions: {
    async loadAliases(context, domainId) {
      try {
        context.commit("setLoaded", false);

        const res = await api.aliases.getAliases(domainId);

        context.commit("setAliases", res.result);
        context.commit("setLoaded", true);
      } catch (e) {
        console.warn(e);
      }
    },

    async loadAlias(context, aliasId: number) {
      try {
        const alias = await api.aliases.getAlias(aliasId);

        context.commit("setAlias", alias);
      } catch (e) {
        console.warn(e);
      }
    },

    async create(context, data: AliasData) {
      const alias = await api.aliases.create(data);

      context.commit("add", alias);

      const email = `${alias.source}@${alias.domain_name}`;

      await context.dispatch(
        "showMessage",
        createSuccessMessage(
          "Alias created",
          `Alias ${email} has been successfully created.`,
          { name: "alias", params: { aliasId: alias.id } }
        ),
        { root: true }
      );
    },

    async update(context, { aliasId, data }) {
      const alias = await api.aliases.update(aliasId, data);

      context.commit("update", alias);

      const email = `${alias.source}@${alias.domain_name}`;

      await context.dispatch(
        "showMessage",
        createSuccessMessage(
          "Alias updated",
          `Alias ${email} has been successfully updated.`
        ),
        { root: true }
      );
    },

    async remove(context, aliasId: number) {
      await api.aliases.remove(aliasId);

      context.commit("remove", aliasId);

      await context.dispatch(
        "showMessage",
        createSuccessMessage("Alias removed", `Alias has been successfully removed.`),
        { root: true }
      );

      return router.push({ name: "aliases" });
    },
  },
};
