<template>
  <header>
    <div class="title">
      <span class="material-icons-sharp">
          people
      </span>
      <h2>People</h2>
    </div>
    <div class="user">
      <span class="placeholder" />
      <img class="avatar" src="//static.ecoach.com/assets/images/admin.png" />
    </div>
  </header>
  <section>
    <div class="people-header">
      <span class="placeholder" />
      <span class="placeholder button" />
    </div>
    <div class="person-placeholder">
      <PlaceholderPerson />
      <PlaceholderProfile class="profile" />
    </div>
    <div class="person-placeholder">
      <PlaceholderPerson />
      <PlaceholderProfile class="profile" />
    </div>
    <button class="person" @click="$router.push('/people/1')">
      <img class="avatar" src="//static.ecoach.com/assets/images/mike.png" />
      <span class="title">
        Mike David
      </span>
      <button @click="$router.push('/people/1')">
        <span class="material-icons-sharp">
          arrow_circle_right
        </span>
      </button>
    </button>
    <div class="person-placeholder">
      <PlaceholderPerson />
      <PlaceholderProfile class="profile" />
    </div>
    <div class="person-placeholder">
      <PlaceholderPerson />
      <PlaceholderProfile class="profile" />
    </div>
    <div class="person-placeholder">
      <PlaceholderPerson />
      <PlaceholderProfile class="profile" />
    </div>
  </section>
</template>

<script>
import PlaceholderPerson from '@/assets/placeholder-person.svg';
import PlaceholderProfile from '@/assets/placeholder-profile.svg';

export default {
  name: 'People',
  components: { PlaceholderPerson, PlaceholderProfile }
}
</script>

<style lang="scss" scoped>
section {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  .people-header {
    position: relative;
    display: flex;
    gap: 12px;
    padding: 12px 0;
    .placeholder {
      flex: 1;
      border-radius: 40px;
      background-color: #ECECEC;
      height: 48px;
      &.button {
        flex: 0 0 auto;
        width: 180px;
        border-radius: 12px;
      }
    }
  }
  .person {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px;
    margin: 0 8px 4px;
    background-color: #FFF;
    border-radius: 12px;
    box-shadow: var(--shadow-base);
    text-align: left;
    font-weight: 600;
    &:hover {
      box-shadow: var(--shadow-xl);
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #ECECEC;
    }
    .title {
      flex: 1;
    }
    .material-icons-sharp {
      font-size: 40px;
    }
    button {
      color: var(--primary-shade);
      display: flex;
      align-items: center;
    }
  }
  .person-placeholder {
    position: relative;
    > svg { width: 100%; }
    .profile {
      position: absolute;
      top: 22px;
      left: 24px;
      width: auto;
    }
  }
}
</style>