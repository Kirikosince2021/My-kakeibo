<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/other.scss';
</style>

<template>
  <div class="other-view">
    <div class="page-headding">
      <span>
        <i class="fas fa-wrench"></i>
        Other
      </span>
      <span>ログアウトや設定情報などを確認できます。</span>
      <div class="border"/>
    </div>
    <div class="other-view__body">
      <nav>
        <ul>
          <li @click="logout()" class="logout-btn">ログアウト</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.$store.commit('setCurrentUser', null)
        this.$router.push('/login')
      })
    }
  }
}
</script>
