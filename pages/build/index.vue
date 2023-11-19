<template>
    <iframe :src="_embedLink" />
</template>

<script>
import { addMessage } from '@/store/global.js';

export default {
    name: 'CourseBuilderStandalone',
    data() {
        return {
            embedLink: null
        };
    },
    computed: {
        params() {
            return this.$route.query.flow ? `?flow=${this.$route.query.flow}` : '';
        },
        _embedLink() {
            if (this.embedLink) {
                return `${this.embedLink}${this.params}`;
            }
        }
    },
    async mounted() {
        this.embedLink = await $fetch('/api/edit');
      addMessage(`/api/v1/headless/course/edit
${this.embedLink}`);
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