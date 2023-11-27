<template>
  <header>
    <div class="title">
      <span class="material-icons-sharp">
          edit
      </span>
      <h2>Training</h2>
    </div>
    <div class="user">
      <span class="placeholder" />
      <img class="avatar" src="//static.ecoach.com/assets/images/admin.png" />
    </div>
  </header>
  <section>
    <div class="courses-header">
      <span class="placeholder" />
      <button @click="isCreating = true">
        <span class="material-icons-sharp">
          add
        </span>
        Create course
      </button>
      <div v-if="isCreating" class="popup">
        <button @click="$router.push('/build')">
          <span class="material-icons-sharp">
            add
          </span>
          Start from scratch
        </button>
        <button @click="$router.push('/build?flow=ai')">
          <span class="material-icons-sharp">
            star
          </span>
          Generate a course
        </button>
        <button @click="$router.push('/build?flow=document')">
          <span class="material-icons-sharp">
            document_scanner
          </span>
          Document to course
        </button>
      </div>
    </div>
    <Course
      v-for="course in courses"
      :key="course.id"
      :course="course"
      admin
    />
  </section>
</template>

<script>
import { courses } from '@/store/global.js';

export default {
  name: 'Training',
  data() {
    return {
      isCreating: false
    };
  },
  computed: {
    courses() {
      return courses.value;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .courses-header {
    position: relative;
    display: flex;
    gap: 12px;
    padding: 12px 0;
    .placeholder {
      flex: 1;
      border-radius: 40px;
      background-color: #ECECEC;
      height: 48px;
    }
    button {
      background-color: var(--primary);
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      font-weight: 600;
    }
    .popup {
      position: absolute;
      top: 100%;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: #FFF;
      border-radius: 12px;
      box-shadow: var(--shadow-base);
      padding: 12px;
      button {
        padding: 12px 16px;
        border-radius: 12px;
        background-color: #FFF;
        &:hover {
          background-color: var(--cloud);
        }
      }
    }
  }
}
</style>