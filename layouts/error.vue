<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/error.scss';
</style>

<template>
  <div class="error-view">
    <div class="error-view__inner">
      <span>My Kakeibo</span>
      <p>なんらかのエラーが発生しました。<br>再度お試しいただくか、時間をおいてください。</p>
      <router-link to="/"><button type="button">ホームページへもどる</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>