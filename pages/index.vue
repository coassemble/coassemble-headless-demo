<template>
  <header>
    <div class="title">
      <span class="material-icons-sharp">
          grid_view
      </span>
      <h2>Dashboard</h2>
    </div>
    <div class="user">
      <span class="placeholder" />
      <img class="avatar" src="//static.ecoach.com/assets/images/mike.png" />
    </div>
  </header>
  <section>
    <h3>
      Welcome Mike
    </h3>
    <div class="content">
      <PlaceholderDashboard />
      <div class="training-container">
        <div class="training">
          <h4>Required training</h4>
          <div v-if="incompleteCourses.length" class="courses">
            <Course
              v-for="course in incompleteCourses"
              :key="course.id"
              :course="course"
            />
          </div>
          <div v-else class="empty">
            You have completed all your required learning.
          </div>
          <button @click="isShowingCompleted = !isShowingCompleted">
            Show completed training
            <span class="material-icons-sharp" :class="{ open: isShowingCompleted }">
              arrow_right
            </span>
          </button>
          <div v-if="isShowingCompleted && completedCourses.length" class="courses">
              <Course
                v-for="course in completedCourses"
                :key="course.id"
                :course="course"
              />
          </div>
          <div v-else-if="isShowingCompleted" class="empty">
            You have not completed any training.
          </div>
        </div>
        <div class="placeholder" />
      </div>
    </div>
  </section>
</template>

<script>
import { courses } from '@/store/global.js';

import PlaceholderProfile from '@/assets/placeholder-profile.svg';
import PlaceholderDashboard from '@/assets/placeholder-dashboard.svg';

export default {
  name: 'Dashboard',
  components: { PlaceholderProfile, PlaceholderDashboard },
  data() {
    return {
      isShowingCompleted: false
    };
  },
  computed: {
    courses() {
      return courses.value || [];
    },
    incompleteCourses() {
      return this.courses.filter(course => course.progress !== 100) || [];
    },
    completedCourses() {
      return this.courses.filter(course => course.progress === 100) || [];
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 16px 0;
  h3 {
    font-family: var(--display);
    font-size: 48px;
    font-weight: 400;
  }
  .content {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-top: 24px;
    position: relative;
    svg {
      box-shadow: var(--shadow-xl);
      border-radius: 16px;
    }
    .training-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 1;
      min-width: 456px;
      .training {
        flex: 0 0 auto;
        background-color: #FFF;
        border-radius: 16px;
        box-shadow: var(--shadow-xl);
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        h4 {
          font-size: 24px;
        }
        .empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(196, 188, 252, 0.20);
          padding: 24px;
          border-radius: 12px;
          font-weight: 400;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .courses {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-bottom: 1px solid #F5F5F5;
        }
        > button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          font-weight: 700;
          .material-icons-sharp.open {
            transform: rotate(90deg);
          }
        }
      }
      .placeholder {
        flex: 0 0 auto;
        background-color: #ECECEC;
        border-radius: 16px;
        height: 436px;
      }
    }
  }
}
</style>