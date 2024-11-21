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
        const config = useRuntimeConfig();
        const params = {
            headers: {
                'Authorization': `COASSEMBLE-V1-SHA256 UserId=${config.public.user}, UserToken=${config.public.token}`
            }
        };

        const getRandomID = () => Math.floor(Math.random() * 1000000);
        const clientIdentifier = getRandomID();
        const identifier = getRandomID();

        this.embedLink = await $fetch(
            `${config.public.url}/v1/headless/course/edit?clientIdentifier=${clientIdentifier}&identifier=${identifier}&id=${this.courseId}`,
            params
        );
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