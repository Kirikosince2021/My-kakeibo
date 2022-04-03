<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/index.scss';

header {
  position: absolute;
  top: 0;
  font-size: 12px;
  background: #444444;
  color: white;
  opacity: 0.5;
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100vw;
  min-width: 1000px;
}
</style>

<template>
  <div class="index-view">
    <header>
      <span class="login-user">ログイン中:{{ email }}</span>
    </header>
    <div class="index-view__top-image" />
    <div class="card-menu"></div>
    <div class="index-view__contents" :class="mode">
      <CardMenu @changeMode = changeMode />

      <History v-if="mode === 'history'"/>
      <Analytics v-if="mode === 'analytics'"/>
      <Other v-if="mode === 'other'"/>
    </div>
    <Footer />
  </div>
</template>

<script>

export default {
  data() {
    return {
      mode: 'history',
      email: null
    }
  },
  methods: {
    changeMode(mode) {
      this.mode = mode
    },
    checkUser() {
      if(!this.$store.getters.currentUser) return this.$router.push('/login')
      this.email = this.$store.getters.currentUser.email
    }
  },
  created() {
    this.checkUser()
  }
}
</script>
