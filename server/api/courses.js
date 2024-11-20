export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const params = {
    headers: {
      'Authorization': `COASSEMBLE-V1-SHA256 UserId=${config.user}, UserToken=${config.token}`
    }
  };

  return await $fetch(`${config.url}/v1/headless/courses`, params);
});