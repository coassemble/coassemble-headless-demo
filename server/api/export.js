export default defineEventHandler(async (event) => {
   const config = useRuntimeConfig(event);
   const id = getQuery(event).id;
   return await $fetch(`${config.url}/v1/headless/course/scorm/${id}`, { headers: config.headers });
 });