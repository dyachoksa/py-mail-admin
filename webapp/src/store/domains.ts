import { Module } from "vuex";
import { RootState } from "@/store/index";
import { api } from "@/api";
import { router } from "@/routes";
import { createSuccessMessage } from "@/helpers/messages";

export interface Domain {
  id: number;
  fqdn: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DomainData {
  fqdn: string;
  is_active: boolean;
  add_standard_mailboxes?: boolean;
  add_admin_mailbox?: boolean;
  redirect_to?: string;
}

export interface DomainsState {
  domains: Domain[];
  isLoaded: boolean;
}

export const domains: Module<DomainsState, RootState> = {
  state() {
    return {
      domains: [],
      isLoaded: false,
    };
  },

  namespaced: true,

  getters: {
    getDomain: (state) => (domainId: number) =>
      state.domains.find((domain) => domain.id === domainId),
  },

  mutations: {
    addDomain(state, domain: Domain) {
      state.domains = [domain, ...state.domains];
    },

    updateDomain(state, domain: Domain) {
      state.domains = state.domains.map((d) => (d.id == domain.id ? domain : d));
    },

    removeDomain(state, domainId: number) {
      state.domains = state.domains.filter((d) => d.id !== domainId);
    },

    setDomains(state, domains) {
      state.domains = domains;
    },

    setLoaded(state, isLoaded) {
      state.isLoaded = isLoaded;
    },
  },

  actions: {
    async loadDomains(context) {
      const domains = await api.domains.getDomains();

      context.commit("setDomains", domains.result);
      context.commit("setLoaded", true);
    },

    async createDomain(context, data: DomainData) {
      try {
        const domain = await api.domains.create(data);

        context.commit("addDomain", domain);

        await context.dispatch(
          "showMessage",
          createSuccessMessage(
            "Domain created",
            `Domain ${domain.fqdn} has been successfully created.`,
            { name: "domain", params: { domainId: domain.id } }
          ),
          { root: true }
        );
      } catch (e) {
        console.warn((e as Error).toString());
        throw "Can't create new domain";
      }
    },

    async updateDomain(
      context,
      { domainId, data }: { domainId: number; data: DomainData }
    ) {
      try {
        const domain = await api.domains.update(domainId, data);

        context.commit("updateDomain", domain);

        await context.dispatch(
          "showMessage",
          createSuccessMessage(
            "Domain updated",
            `Domain ${domain.fqdn} has been successfully updated.`
          ),
          { root: true }
        );
      } catch (e) {
        console.warn((e as Error).toString());
        throw "Can't update domain";
      }
    },

    async removeDomain(context, domainId: number) {
      try {
        await api.domains.remove(domainId);

        context.commit("removeDomain", domainId);

        await context.dispatch(
          "showMessage",
          createSuccessMessage(
            "Domain removed",
            `Domain has been successfully removed.`
          ),
          { root: true }
        );

        return router.push({ name: "domains" });
      } catch (e) {
        console.warn((e as Error).toString());
        throw "Can't remove domain";
      }
    },
  },
};
