import axios from "axios";
import { User, LoginData } from "@/store/auth";
import { Domain, DomainData } from "@/store/domains";
import { Mailbox, MailboxData } from "@/store/mailboxes";
import { Alias, AliasData } from "@/store/aliases";

interface Response<T> {
  result: T;
}

interface ListResponse<T> extends Response<T> {
  total: number;
  count: number;
}

interface AuthResponse extends Response<User> {
  token: string;
}

const axiosInstance = axios.create({
  baseURL: "/api/",
});

// Authentication & authorization
const getCurrentUser = () =>
  axiosInstance.get<Response<User>>("auth/me").then((res) => res.data.result);

const getToken = (data: LoginData) =>
  axiosInstance.post<AuthResponse>("auth/token", data).then((res) => res.data);

// Domains
const getDomains = () =>
  axiosInstance.get<ListResponse<Domain[]>>("domains").then((res) => res.data);

const createDomain = (data: DomainData) =>
  axiosInstance.post<Response<Domain>>("domains", data).then((res) => res.data.result);

const updateDomain = (domainId: number, data: DomainData) =>
  axiosInstance
    .put<Response<Domain>>(`domains/${domainId}`, data)
    .then((res) => res.data.result);

const removeDomain = (domainId: number) => axiosInstance.delete(`domains/${domainId}`);

// Mailboxes
const getMailboxes = (domainId: number) => {
  const params: any = {};
  if (domainId) {
    params["domainId"] = domainId;
  }

  return axiosInstance
    .get<ListResponse<Mailbox[]>>("mailboxes", { params })
    .then((res) => res.data);
};

const getMailbox = (mailboxId: number) =>
  axiosInstance
    .get<Response<Mailbox>>(`mailboxes/${mailboxId}`)
    .then((res) => res.data.result);

const createMailbox = (data: MailboxData) =>
  axiosInstance
    .post<Response<Mailbox>>("mailboxes", data)
    .then((res) => res.data.result);

const updateMailbox = (mailboxId: number, data: MailboxData) =>
  axiosInstance
    .put<Response<Mailbox>>(`mailboxes/${mailboxId}`, data)
    .then((res) => res.data.result);

const removeMailbox = (mailboxId: number) =>
  axiosInstance.delete(`mailboxes/${mailboxId}`);

// Aliases
const getAliases = (domainId: number) => {
  const params: any = {};
  if (domainId) {
    params["domainId"] = domainId;
  }

  return axiosInstance
    .get<ListResponse<Alias[]>>("aliases", { params })
    .then((res) => res.data);
};

const getAlias = (aliasId: number) =>
  axiosInstance
    .get<Response<Alias>>(`aliases/${aliasId}`)
    .then((res) => res.data.result);

const createAlias = (data: AliasData) =>
  axiosInstance.post<Response<Alias>>("aliases", data).then((res) => res.data.result);

const updateAlias = (aliasId: number, data: AliasData) =>
  axiosInstance
    .put<Response<Alias>>(`aliases/${aliasId}`, data)
    .then((res) => res.data.result);

const removeAlias = (aliasId: number) => axiosInstance.delete(`aliases/${aliasId}`);

// Metrics
const metricsTotals = () =>
  axiosInstance.get("metrics/totals").then((res) => res.data.result);

export const api = {
  auth: { getCurrentUser, getToken },
  domains: {
    getDomains,
    create: createDomain,
    update: updateDomain,
    remove: removeDomain,
  },
  mailboxes: {
    getMailboxes,
    getMailbox,
    create: createMailbox,
    update: updateMailbox,
    remove: removeMailbox,
  },
  aliases: {
    getAliases,
    getAlias,
    create: createAlias,
    update: updateAlias,
    remove: removeAlias,
  },
  metrics: {
    getTotals: metricsTotals,
  },
};
