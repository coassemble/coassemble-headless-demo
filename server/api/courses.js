export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  return await $fetch(`${config.url}/v1/headless/courses`, { headers: config.headers });
});