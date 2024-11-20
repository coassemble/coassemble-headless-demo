export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const params = {
    headers: {
      'Authorization': `COASSEMBLE-V1-SHA256 UserId=${config.user}, UserToken=${config.token}`
    }
  };

  const getRandomID = () => {
    return Math.floor(Math.random() * 1000000);
  }

  const id = getQuery(event).id;
  const identifier = getRandomID();

  let query = `?identifier=${identifier}`;
  if (id) query += `&id=${id}`;
  return await $fetch(`${config.url}/v1/headless/course/view` + query, params);
});