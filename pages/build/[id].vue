<template>
    <iframe :src="embedLink" />
</template>

<script>
import { getCourse, addMessage } from '@/store/global.js';

export default {
    name: 'CourseBuilder',
    data() {
        return {
            embedLink: null
        };
    },
    computed: {
        courseId() {
            return this.$route.params.id;
        },
        course() {
            return getCourse(this.$route.params.id) || {};
        }
    },
    async mounted() {
        this.embedLink = await $fetch('/api/edit', { query: { id: this.courseId } });
        addMessage(`/api/v1/headless/course/edit?id=${this.courseId}`, this.embedLink);
        window.addEventListener('message', this.onMessage);
    },
    beforeUnmount() {
        window.removeEventListener('message', this.onMessage);
    },
    methods: {
        onMessage(event) {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'back') this.$router.push('/training');
            } catch (e) {
                return;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
iframe {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>