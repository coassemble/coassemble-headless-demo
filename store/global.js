import { ref } from 'vue';

export const courses = ref([]);
export const setCourses = (data) => courses.value = data;
export const getCourse = (id) => courses.value.find(course => course.id === Number(id));
export const setCourse = (course) => {
    const index = courses.value.findIndex(({ id }) => id === course.id);
    if (~index) courses.value[index] = { ...courses.value[index], ...course };
}


export const role = ref('learner');
export const setRole = (data) => role.value = data;