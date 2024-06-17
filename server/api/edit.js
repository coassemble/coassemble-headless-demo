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
  const clientIdentifier = getRandomID();
  const identifier = getRandomID();

  let query = `?clientIdentifier=${clientIdentifier}&identifier=${identifier}`;
  if (id) query += `&id=${id}`;
  return await $fetch(`${config.url}/api/v1/headless/course/edit` + query, params);
});
