<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/index.scss';
</style>
<template>
  <div class="memo memo--closed"
   @mouseenter="openMemo()"
   @mouseleave="closeMemo()">
    <textarea v-model="user_memo" @change="saveMemo()"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_memo: 'memo'
    }
  },
  methods: {
    openMemo() {
      document.querySelector('.memo').classList.remove('memo--closed')
    },
    closeMemo() {
      document.querySelector('.memo').classList.add('memo--closed')
    },
    async saveMemo() {
      
    }
  }
}
</script>