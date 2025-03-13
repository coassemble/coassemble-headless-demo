export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getQuery(event).id;
  await $fetch(`${config.url}/v1/headless/course/${id}`, { method: 'DELETE', headers: config.headers });
});