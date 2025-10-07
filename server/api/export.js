export default defineEventHandler(async (event) => {
   const config = useRuntimeConfig(event);
   const id = getQuery(event).id;
   const type = 'dynamic'; // static or dynamic
   return await $fetch(`${config.url}/v1/headless/course/scorm/${id}?type=${type}`, { headers: config.headers });
 });