<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/login.scss';

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
  font-size: 14px;
  min-width: 1000px;

  .site-title {
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="login-view">
    <header>
      <span class="site-title">My Kakeibo ver.1.0</span>
      <span class="site-desc">支出のみを記録するシンプルなデジタル家計簿</span>
    </header>
    <div class="note">
      <!--デフォルトページ!-->
      <div class="left-page" v-show="mode === 'default'">
        <div class="site-desc">
          <h1 class="section-title">My Kakeibo</h1>
          <div class="border-line"/>
          <small class="site-desc">
            支出のみを記録するシンプルなデジタル家計簿<br>
          </small>
        </div>
        <div class="update">
          <h1 class="section-title">Update</h1>
          <div class="border-line"/>
          <ul>
            <li>2022/2/14 一部フォントの変更/新規記録時に金額へ初期代入される0を削除</li>
            <li>2022/2/15 タグ名編集機能を追加/一部スタイル変更/メニュー画面をotherタブへ移動</li>
            <li>2022/2/15 エラーページを実装/他多数</li>
            <li>2022/2/18 スタイルの崩れを修正 & エラー対応</li>
            <li>2022/2/18 バージョンを1.0に指定</li>
          </ul>
          <span class="more" @click="mode = 'history'">▶︎See More...</span>
        </div>

      </div>
      <div class="right-page" v-show="mode === 'default'">
        <div class="login-view__login" v-show="showLogin">
          <h1 class="section-title">My Kakeibo</h1>
          <form>
            <label for="email">Mail</label>
            <input type="email" v-model="email">

            <label for="password">Password</label>
            <input type="password" v-model="password">
            <button class="login-btn" type="button" @click="login()">Login</button>
          </form>
          <small @click="showRegister=true;showLogin=false">新規登録はこちら</small>
        </div>
        <div class="login-view__register" v-show="showRegister">
        <h1 class="section-title">My Kakeibo</h1>
        <span>新規登録フォーム</span>
        <form>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label for="email">Mail</label>
              <input type="email" v-model="email" name="メールアドレス">
              <small class="validation-error">
                {{ errors[0] }}
              </small>
            </validation-provider>

            <validation-provider v-slot="{ errors }" rules="required|min:8|alpha_num">
              <label for="password">Password</label>
              <input type="password" v-model="password" name="パスワード">
              <small class="validation-error">
                {{ errors[0] }}
              </small>
            </validation-provider>

            <button
              class="register-btn"
              type="button"
              @click="register()"
              v-show="!loading"
              :disabled="ObserverProps.invalid || !ObserverProps.validated">
              Register
            </button>

            <LoadBar v-show="loading"/>

            <small @click="showRegister=false;showLogin=true">ログイン画面に戻る</small>
          </validation-observer>
        </form>
        </div>
      </div>

      <!--ヒストリーページ!-->
      <div class="left-page" v-show="mode === 'history'">
        <span @click="mode = 'default'" class="back">◀︎...Back Top</span>
        <div class="update">
          <h1 class="section-title">Update</h1>
          <div class="border-line"/>
          <ul>
            <li>2022/2/14 一部フォントの変更/新規記録時に金額へ初期代入される0を削除</li>
            <li>2022/2/15 タグ名編集機能を追加/一部スタイル変更/メニュー画面をotherタブへ移動</li>
            <li>2022/2/15 エラーページを実装/他多数</li>
            <li>2022/2/18 スタイルの崩れを修正 & エラー対応</li>
            <li>2022/2/18 バージョンを1.0に指定</li>
            <li>2022/4/5 ロードバーの表示崩れを修正</li>
          </ul>
        </div>
      </div>
      <div class="right-page" v-show="mode === 'history'"></div>

      <div class="note__rings">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadBar from '@/components/LoadBar.vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { app, db } from '@/plugins/firebase'

export default {
  components: { LoadBar },
  data() {
    return {
      email: '',
      password: '',
      showLogin: true,
      showRegister: false,
      loading: false,
      mode: 'default'
    }
  },
  methods: {
    checkUser() {
      if(this.$store.getters.currentUser) this.$router.push('/')
    },
    login() {
      if(this.email && this.password) {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, this.email,this.password)
        .then((userCredential) => {
          this.$store.commit('setCurrentUser', userCredential.user, {root:true})
          this.$router.push('/')
        })
        .catch(() => {
          alert('メールアドレスまたはパスワードが間違っています。')
        })
      }
    },
    register() {
      if(this.email && this.password) {
        // ロード表示&ボタン非表示
        this.loading = true
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.commit('setCurrentUser', userCredential.user, {root:true})
          this.$router.push('/')
        })
        .catch(() => {
          this.loading = false
          alert('エラーが発生しました。時間をおいて再度お試しください。また、すでに登録されているアドレスは使用できません。')
        })
      }
    }
  },
  created() {
    this.checkUser()
  }
}
</script>