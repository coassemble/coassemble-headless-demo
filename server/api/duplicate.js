const getRandomID = () => Math.floor(Math.random() * 1000000);

export default defineEventHandler(async (event) => {
   const config = useRuntimeConfig(event);

   const id = getQuery(event).id;
   const clientIdentifier = String(getRandomID());
   const identifier = String(getRandomID());
   return await $fetch(`${config.url}/v1/headless/course/${id}/duplicate`, { method: 'POST', headers: config.headers, body: { clientIdentifier, identifier } });
 });