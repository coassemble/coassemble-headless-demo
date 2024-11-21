<template>
    <header>
      <div class="title">
        <button class="fade" @click="$router.push('/training')">
            <span class="material-icons-sharp">
                school
            </span>
            <h2>Training</h2>
        </button>
        <span class="material-icons-sharp">
            arrow_right
        </span>
        <h2>{{ course.title }}</h2>
      </div>
      <div class="user">
        <span class="placeholder" />
        <img class="avatar" src="//static.ecoach.com/assets/images/mike.png" />
      </div>
    </header>
    <section>
        <div class="loading-state">
            <span class="material-icons-sharp">
                hourglass_top
            </span>
            <span>{{ loading }}</span>
        </div>
        <iframe :src="embedLink" />
    </section>
  </template>
  
  <script>
  import { getCourse, setCourse, addMessage } from '@/store/global.js';
  
  export default {
    name: 'Course',
    data() {
        return {
            embedLink: null,
            loading: 'Course loading...'
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
        const params = {
            headers: {
                'Authorization': `COASSEMBLE-V1-SHA256 UserId=${this.$config.public.user}, UserToken=${this.$config.public.token}`
            }
        };

        const getRandomID = () => Math.floor(Math.random() * 1000000);
        const identifier = getRandomID();

        this.embedLink = await $fetch(
            `${this.$config.public.url}/v1/headless/course/view?identifier=${identifier}&id=${this.courseId}`,
            params
        );
        addMessage(`/api/v1/headless/course/view?id=${this.courseId}`, this.embedLink);
        window.addEventListener('message', this.onMessage);

        setInterval(() => {
            this.loading = this.loading === 'Course loading...' ? 'Course loading' : this.loading + '.';
        }, 500);
    },
    beforeUnmount() {
        window.removeEventListener('message', this.onMessage);
    },
    methods: {
        onMessage(event) {
            let message;
            try {
                message = JSON.parse(event.data);
            } catch (e) {
                return;
            }
            if (message.event === 'progress') {
                this.course.progress = message.data.progress;
                setCourse(this.course);
            }
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  section {
    flex: 1;
    position: relative;
    margin: 16px 0;
    border-radius: 24px;
    background-color: #ECECEC;
    overflow: hidden;
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
    }
    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        inset: 0;
        gap: 12px;
        .material-icons-sharp {
            color: var(--primary-shade);
            animation: rotate 2s ease infinite;
        }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>