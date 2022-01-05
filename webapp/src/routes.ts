import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store";

import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Login.vue";
import Domains from "@/pages/Domains.vue";
import DomainDetails from "@/pages/DomainDetails.vue";
import Mailboxes from "@/pages/Mailboxes.vue";
import MailboxDetails from "@/pages/MailboxDetails.vue";
import Aliases from "@/pages/Aliases.vue";
import AliasDetails from "@/pages/AliasDetails.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: Dashboard },
    { path: "/domains", name: "domains", component: Domains },
    { path: "/domains/:domainId", name: "domain", component: DomainDetails },
    { path: "/mailboxes", name: "mailboxes", component: Mailboxes },
    { path: "/mailboxes/:mailboxId", name: "mailbox", component: MailboxDetails },
    { path: "/aliases", name: "aliases", component: Aliases },
    { path: "/aliases/:aliasId", name: "alias", component: AliasDetails },
    { path: "/login", name: "login", component: Login },
  ],
});

router.beforeEach((to, from) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const isLoaded = store.state.auth.isLoaded;

  if (to.name == "login" && isAuthenticated) {
    return { name: "dashboard" };
  }

  if (to.name != "login" && !isAuthenticated && isLoaded) {
    return { name: "login" };
  }
});
