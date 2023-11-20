export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const params = {
    headers: {
      'Authorization': `Authorization: COASSEMBLE-V1-SHA256 UserId=${config.user}, UserToken=${config.token}`
    }
  };

  return await $fetch(`${config.url}/api/v1/headless/courses`, params)
    .catch((error) => {
      console.error(error);
      return {
        status: 500,
        body: { error, params }
      };
    });
});