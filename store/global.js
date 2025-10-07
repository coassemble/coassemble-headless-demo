import { ref } from 'vue';

export const courses = ref([]);
export const setCourses = (data) => courses.value = data;
export const getCourse = (id) => courses.value.find(course => course.id === Number(id));
export const setCourse = (course) => {
    const index = courses.value.findIndex(({ id }) => id === course.id);
    if (~index) courses.value[index] = { ...courses.value[index], ...course };
}
export const removeCourse = (id) => {
    const index = courses.value.findIndex(({ id: _id }) => id === _id);
    if (~index) courses.value.splice(index, 1);
}
export const addCourse = (course) => courses.value.push(course);

export const role = ref('learner');
export const setRole = (data) => role.value = data;

export const messages = ref([]);
export const addMessage = (title, data) => messages.value.push({ data: '\r\n\r\n' + data, title, time: new Date().toLocaleTimeString() });