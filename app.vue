<template>
  <main :class="{ open: isSidebarOpen }">
    <aside>
      <div class="logo">
        <Logo />
        <h1 v-if="isSidebarOpen">PeopleTech</h1>
      </div>
      <nav>
        <template v-if="role === 'learner'">
          <RouterLink to="/">
            <span class="material-icons-sharp">
              grid_view
            </span>
            <template v-if="isSidebarOpen">
              Dashboard
            </template>
          </RouterLink>
          <a to="#" :class="{ 'router-link-active': $route.path.includes('/course') }">
            <span class="material-icons-sharp">
              school
            </span>
            <template v-if="isSidebarOpen">
              Training
            </template>
          </a>
        </template>
        <template v-else-if="role === 'admin'">
          <RouterLink to="/people">
            <span class="material-icons-sharp">
              people
            </span>
            <template v-if="isSidebarOpen">
              People
            </template>
          </RouterLink>
          <RouterLink to="/training">
            <span class="material-icons-sharp">
              edit
            </span>
            <template v-if="isSidebarOpen">
              Training
            </template>
          </RouterLink>
        </template>
        <template v-if="isSidebarOpen">
          <PlaceholderLink />
          <PlaceholderLink />
          <PlaceholderLink />
          <PlaceholderLink />
          <PlaceholderLink />
        </template>
        <template v-else>
          <PlaceholderLinkMobile />
          <PlaceholderLinkMobile />
          <PlaceholderLinkMobile />
          <PlaceholderLinkMobile />
          <PlaceholderLinkMobile />
        </template>
      </nav>
      <button @click="isSidebarOpen = !isSidebarOpen">
        <span class="material-icons-sharp">
          menu_open
        </span>
      </button>
    </aside>
    <div class="route">
      <div class="route-container">
        <NuxtPage />
      </div>
    </div>
    <div class="debugger" :class="{ open: isDebuggerOpen }">
      <button @click="isDebuggerOpen = !isDebuggerOpen">
        <span class="material-icons-sharp">
          settings
        </span>
      </button>
      <div class="debugger-panel">
        Role
        <select v-model="role" @input="onRoleSelect">
          <option value="admin">Admin</option>
          <option value="learner">Learner</option>
        </select>
        Output
        <pre><code v-html="lastMessage"/></pre>
        <Coassemble />
      </div>
    </div>
  </main>
</template>

<script>
import { setCourses, setRole, role, messages, addMessage } from '@/store/global.js';

import Logo from '@/assets/logo.svg';
import Coassemble from '@/assets/coassemble.svg';
import PlaceholderLink from '@/assets/placeholder-link.svg';
import PlaceholderLinkMobile from '@/assets/placeholder-link-mobile.svg';

export default {
  name: 'App',
  components: { Logo, Coassemble, PlaceholderLink, PlaceholderLinkMobile },
  data() {
    return {
      isSidebarOpen: true,
      isDebuggerOpen: false,
    }
  },
  computed: {
    role() {
      return role.value;
    },
    messages() {
      return messages.value;
    },
    lastMessage() {
      return this.messages[this.messages.length - 1] || '';
    }
  },
  mounted() {
      this.getCourses();
      window.addEventListener('message', this.onMessage);
      if (this.$route.path.includes('/people') || this.$route.path === '/training' || this.$route.path.includes('/build')) {
        setRole('admin');
      }
  },
  beforeUnmount() {
      window.removeEventListener('message', this.onMessage);
  },
  methods: {
    async getCourses() {
      const courses = await $fetch('/api/courses');
      addMessage(`/api/v1/headless/courses
${JSON.stringify(courses, null, 2)}`);
      setCourses(courses);
    },
    onMessage(event) {
        try {
            const message = JSON.parse(event.data);
            addMessage(JSON.stringify(message, null, 2));
        } catch (e) {
            return;
        }
    },
    onRoleSelect(event) {
      const role = event.target.value;
      setRole(role);
      if (role === 'admin') {
        this.$router.push('/people');
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss">
main {
  --sidebar-width: 80px;
  display: flex;
  min-height: 100%;
  aside {
    position: fixed;
    background: var(--slate);
    color: #FFF;
    display: flex;
    flex-direction: column;
    width: var(--sidebar-width);
    transition: width 0.15s ease-in-out;
    padding: 16px;
    gap: 32px;
    height: 100%;
    .logo {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 48px;
      svg { width: 48px; }
      h1 { font-size: 24px; }
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 12px;
      a {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 12px;
        gap: 8px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.30);
        &.router-link-active {
          border-color: transparent;
          background: rgba(255, 255, 255, 0.30);
        }
      }
    }
    button {
      margin-top: auto;
      align-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      padding: 12px;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.3);
      .material-icons-sharp {
        transform: rotate(180deg);
      }
    }
  }
  &.open {
    --sidebar-width: 320px;
    aside {
      .logo svg { width: 24px; }
      nav {
        a {
          padding: 12px 24px;
        }
      }
      button .material-icons-sharp {
        transform: rotate(0);
      }
    }
  }
  .route {
    flex: 1;
    background: var(--cloud);
    margin-left: var(--sidebar-width);
    transition: margin 0.15s ease-in-out;
    .route-container {
      display: flex;
      flex-direction: column;
      max-width: 1128px;
      margin: 0 auto;
      height: 100%;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0px;
      border-bottom: 1px solid #DFDEDE;
      .title {
        display: flex;
        align-items: center;
        gap: 8px;
        h2 { font-size: 24px; }
        .fade { opacity: 0.5; }
      }
      .user {
        display: flex;
        align-items: center;
        gap: 8px;
        .placeholder {
          width: 164px;
          height: 40px;
          border-radius: 40px;
          background: #ECECEC;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ECECEC;
        }
      }
    }
  }
  .debugger {
    position: fixed;
    left: 100%;
    top: 0;
    height: 100%;
    width: 375px;
    transition: all 0.15s ease-in-out;
    background-color: #FFF;
    filter: drop-shadow(var(--shadow-base-filter));
    &.open {
      left: calc(100% - 375px);
    }
    button {
      position: absolute;
      right: 100%;
      margin: 8px 0;
      background-color: #FFF;
      color: var(--primary-shade);
      border-radius: 12px 0 0 12px; 
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }
    .debugger-panel {
      padding: 16px 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pre {
        flex: 1;
        margin: 0;
        padding: 12px;
        background-color: var(--cloud);
        border-radius: 12px;
        font-weight: 200;
        font-size: 14px;
      }
      select { margin-bottom: 12px; }
      svg {
        margin: auto;
        height: 48px;
      }
    }
  }
}
</style>