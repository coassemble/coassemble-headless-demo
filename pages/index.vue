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
          <div class="courses">
            <Course
              v-for="course in courses"
              :key="course.id"
              :course="course"
            />
          </div> 
          <button>
            Show completed training
            <span class="material-icons-sharp">
              arrow_right
            </span>
          </button>
        </div>
        <div class="placeholder" />
      </div>
    </div>
  </section>
</template>

<script>
import { courses } from '@/store/global.js';

import PlaceholderDashboard from '@/assets/placeholder-dashboard.svg';

export default {
  name: 'Dashboard',
  components: { PlaceholderDashboard },
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