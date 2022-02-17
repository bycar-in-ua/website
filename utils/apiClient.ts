import { useFetch } from "nuxt3";

export const get = async (endpoint: string) =>
  await useFetch(endpoint, {
    baseURL: process.env.API_URL,
  });

export const post = async () => {};

export default {
  get,
  post,
};
