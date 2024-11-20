export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const params = {
    method: 'DELETE',
    headers: {
      'Authorization': `COASSEMBLE-V1-SHA256 UserId=${config.user}, UserToken=${config.token}`
    }
  };

  const id = getQuery(event).id;
  return await $fetch(`${config.url}/v1/headless/course/${id}`, params);
});