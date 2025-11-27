const getRandomID = () => String(Math.floor(Math.random() * 1000000));

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const id = getQuery(event).id;
  const clientIdentifier = getRandomID();
  const identifier = getRandomID();

  let params = {
    action: 'edit',
    clientIdentifier,
    identifier,
    options: {
      color: '#C4BCFC', 
      translations: true,
      loom: true,
      publishing: true,
      narrations: true
    }
  };
  if (id) params.id = id;
  return await $fetch(`${config.url}/v1/headless/course/url`, { body: params, headers: config.headers, method: 'POST' });
});
