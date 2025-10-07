const getRandomID = () => Math.floor(Math.random() * 1000000);

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const id = getQuery(event).id;
  const clientIdentifier = getRandomID();
  const identifier = getRandomID();

  let query = {
    flow: 'preview',
    clientIdentifier,
    identifier
  };
  if (id) query.id = id;
  return await $fetch(`${config.url}/v1/headless/course/edit`, { query, headers: config.headers });
});
