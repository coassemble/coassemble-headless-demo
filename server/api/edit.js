export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const params = {
    headers: {
      'Authorization': `COASSEMBLE-V1-SHA256 UserId=${config.user}, UserToken=${config.token}`
    }
  };

  const id = getQuery(event).id;
  return await $fetch(`${config.url}/api/v1/headless/course/edit` + (id ? `?id=${id}` : ''), params);
});