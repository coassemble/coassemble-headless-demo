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
    <div class="person-placeholder">
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
    </div>
    <div class="person-placeholder">
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
    </div>
    <div class="person-placeholder">
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
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
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
    </div>
    <div class="person-placeholder">
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
    </div>
    <div class="person-placeholder">
      <PlaceholderProfile class="profile" />
      <span />
      <button disabled />
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
  gap: 16px;
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
    display: flex;
    align-items: center;
    height: 72px;
    border-radius: 12px;
    background-color: #FAFAFA;
    box-shadow: var(--shadow-base);
    padding: 20px;
    gap: 16px;
    > span {
      background-color: #F5F5F5;
      width: 180px;
      height: 16px;
      border-radius: 16px;
    }
    > button {
      background-color: #F5F5F5;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-left: auto;
    }
  }
}
</style>