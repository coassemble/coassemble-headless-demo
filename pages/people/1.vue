<template>
  <header>
    <div class="title">
      <button class="fade" @click="$router.push('/people')">
        <span class="material-icons-sharp">
            people
        </span>
        <h2>People</h2>
      </button>
      <span class="material-icons-sharp">
          arrow_right
      </span>
      <h2>Mike David</h2>
    </div>
    <div class="user">
      <span class="placeholder" />
      <img class="avatar" src="//static.ecoach.com/assets/images/peopletech/admin.png" />
    </div>
  </header>
  <section>
    <div class="content">
      <div class="profile">
        <div class="profile-header">
          <img class="avatar" src="//static.ecoach.com/assets/images/peopletech/mike.png" />
          <div class="profile-detail">
            <h3>
              Mike David
            </h3>
            <div>
              <span class="placeholder" />
              <span class="placeholder button" />
              <span class="placeholder button" />
            </div>
            <span class="placeholder thin" />
          </div>
        </div>
        <PlaceholderPost />
        <PlaceholderPost />
      </div>
      <div class="training-container">
        <div class="training">
          <h4>Mike's required training</h4>
          <div v-if="learnerCourses.length" class="courses">
            <Course
              v-for="course in learnerCourses"
              :key="course.id"
              :course="course"
              admin
              small
            />
          </div>
          <div v-else class="empty">
            There is no required learning for Mike David
          </div>
          <button
            class="assign"
            @click="isAssigning = !isAssigning"
          >
            Assign learning
          </button>
          <div v-if="isAssigning" class="popup">
            <button
              v-for="course in unassignedCourses"
              @click="assignCourse(course)"
            >
              <img
                  v-if="course.image"
                  :src="course.image"
                  :alt="course.title"
              />
              <img v-else src="//static.ecoach.com/assets/images/peopletech/placeholder.png" />
              <span class="title">
                  {{ course.title }}
              </span>
            </button>
          </div>
        </div>
        <div class="placeholder" />
      </div>
    </div>
  </section>
</template>

<script>
import { courses, setCourse } from '@/store/global.js';

import PlaceholderPost from '@/assets/placeholder-post.svg';

export default {
  name: 'Profile',
  components: { PlaceholderPost },
  data() {
    return {
      isAssigning: false
    }
  },
  computed: {
    courses() {
      return courses.value;
    },
    learnerCourses() {
      return courses.value.filter(course => course.enrolled);
    },
    unassignedCourses() {
      return this.courses.filter(course => !course.enrolled);
    }
  },
  methods: {
    assignCourse(course) {
      this.isAssigning = false;
      setCourse({ ...course, enrolled: true });
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 16px 0;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 24px;
  }
  h3 {
    font-family: var(--display);
    font-size: 40px;
    font-weight: 400;
    line-height: 1;
  }
  .profile-header {
    display: flex;
    align-items: center;
    gap: 32px;
    img { margin-left: 12px; }
    .profile-detail {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
      padding-right: 64px;
      > div {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .placeholder {
        flex: 1;
        border-radius: 40px;
        background-color: #ECECEC;
        height: 32px;
        &.button {
          flex: 0 0 auto;
          width: 32px;
          border-radius: 100%;
        }
        &.thin {
          flex: 0 0 auto;
          height: 24px;
        }
      }
    }
  }
  .content {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-top: 24px;
    svg {
      overflow: visible;
    }
    .profile {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .training-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 0 1 auto;
      width: 408px;
      .training {
        position: relative;
        flex: 0 0 auto;
        background-color: #FFF;
        border-radius: 16px;
        box-shadow: var(--shadow-xl);
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        h4 {
          font-size: 20px;
        }
        .courses {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-bottom: 1px solid #F5F5F5;
        }
        .empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(196, 188, 252, 0.20);
          padding: 24px;
          border-radius: 12px;
          font-weight: 400;
          font-size: 14px;
        }
        button.assign {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-weight: 700;
          background-color: var(--primary);
          height: 48px;
          padding: 24px;
          border-radius: 12px;
          &:hover {
            background-color: var(--primary-shade);
          }
        }
        .popup {
          position: absolute;
          top: 100%;
          margin: 8px 0;
          left: -25%;
          width: 300px;
          transform: translateX(50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: #FFF;
          border-radius: 12px;
          box-shadow: var(--shadow-base);
          padding: 12px;
          max-height: 400px;
          overflow-y: auto;
          button {
            padding: 0;
            background-color: #FFF;
            display: flex;
            align-items: center;
            text-align: left;
            gap: 12px;
            height: auto;
            img {
                width: 64px;
                height: 64px;
                object-fit: cover;
                background-color: var(--primary);
                border-radius: 12px;
            }
            .title { flex: 1; }
            &:hover {
              background-color: var(--cloud);
            }
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