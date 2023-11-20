<template>
    <header>
      <div class="title">
        <span class="material-icons-sharp fade">
            grid_view
        </span>
        <h2 class="fade">Dashboard</h2>
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
                hourglass_empty
            </span>
            <span>Course loading...</span>
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
      this.embedLink = await $fetch('/api/view', { query: { id: this.courseId } });
      addMessage(`/api/v1/headless/course/view?id=${this.courseId}
${this.embedLink}`);
      window.addEventListener('message', this.onMessage);
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
        }
    }
  }
  </style>