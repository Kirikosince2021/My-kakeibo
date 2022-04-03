<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/history.scss';
</style>

<style>
@import '@/assets/style';
</style>

<template>
  <div class="history-view">
    <div class="history-view__contents">

      <div class="contents__left">
        <div class="page-headding">
          <span>
            <i class="fas fa-book"></i>
            History
          </span>
          <span>家計簿のデータを記録、閲覧できます。</span>
          <div class="border"/>
        </div>
        <div class="table-head">
          <button type="button" @click="getHistory(-1)">◀︎</button>
          <h1 class="section-title">
            <button class="reset-history" type="button" @click="resetHistory()">
              <i class="fas fa-undo-alt"></i>
            </button>
            {{searchedYear}}/{{searchedMonth}}<span v-show="searchedDay">/{{searchedDay}}</span></h1>
          <button type="button" @click="getHistory(1)">▶︎</button>
        </div>
        <div class="table-body">
          <!--タグ選択されていない時のリザルト(初期表示)!-->
          <table v-if="!searchedTag&&showTable&&!showHistoryByCard" class="table1">
            <div v-for="historyKey in historyArray" :key="historyKey">
              <tr :class="history[historyKey].checkFlg ? 'checked' : ''">
                <div :class="`color-box`"/>
                <th class="date">{{searchedMonth}}/{{history[historyKey].day}}</th>
                <th class="tag" :class="history[historyKey].tag.color">{{history[historyKey].tag.name | cut }}</th>
                <td class="price">¥ {{history[historyKey].price | priceComma}}</td>
                <td v-show="history[historyKey].cardFlg" class="card"><i class="fas fa-credit-card"></i></td>
                <td v-show="!history[historyKey].cardFlg" class="dummy-card"></td>
                <td class="desc">{{history[historyKey].desc}}</td>
                <td class="edit">
                  <span class="icon-pen" @click="editHistory(historyKey)"/>
                  <span class="icon-bin2" @click="deleteHistory(historyKey)"/>
                  <span class="icon-star-full" @click="checkHistory(historyKey)"/>
                </td>
              </tr>
            </div>
            <tr class="sum">
              <th>合計</th>
              <td>¥ {{sum | priceComma}}</td>
            </tr>
            <tr class="target">
              <th>当月目標額</th>
              <td>¥<input type="number" v-model="targetPrice" @change="setTarget()"/></td>
            </tr>
            <tr class="gap">
              <th>目標額との差額</th>
              <td>
                <span>{{ pm }}</span>
                ¥ {{ gap | priceComma}}</td>
            </tr>
          </table>
          <!--タグ選択されている時のリザルト!-->
          <table v-if="searchedTag&&showTable&&!showHistoryByCard" class="table2">
            <div v-for="historyKey in historyArray" :key="historyKey">
              <tr :class="historyByTag[historyKey].checkFlg ? 'checked' : ''" v-if="historyByTag[historyKey]">
                <div :class="`color-box`"/>
                <th class="date">{{searchedMonth}}/{{historyByTag[historyKey].day}}</th>
                <th class="tag" :class="historyByTag[historyKey].tag.color">{{historyByTag[historyKey].tag.name | cut }}</th>
                <td class="price">¥ {{historyByTag[historyKey].price | priceComma}}</td>
                <td v-show="historyByTag[historyKey].cardFlg" class="card"><i class="fas fa-credit-card"></i></td>
                <td v-show="!historyByTag[historyKey].cardFlg" class="dummy-card"></td>
                <td class="desc">{{historyByTag[historyKey].desc}}</td>
                <td class="edit">
                  <span class="icon-pen" @click="editHistory(historyKey)"/>
                  <span class="icon-bin2" @click="deleteHistory(historyKey)"/>
                  <span class="icon-star-full" @click="checkHistory(historyKey)"/>
                </td>
              </tr>
            </div>
            <tr class="sum">
              <th>合計</th>
              <td>¥ {{sumByTag | priceComma}}</td>
            </tr>
            <tr class="target">
              <th>当月目標額</th>
              <td>¥<input type="number" v-model="targetPrice" @change="setTarget()"/></td>
            </tr>
            <tr class="gap">
              <th>目標額との差額</th>
              <td>
                <span>{{ pm }}</span>
                ¥ {{ gapByTag | priceComma}}</td>
            </tr>
          </table>
          <!--カード限定表示モード時のリザルト!-->
          <table v-if="showHistoryByCard&&showTable" class="table3">
            <div v-for="historyKey in historyArray" :key="historyKey">
              <tr :class="historyByCard[historyKey].checkFlg ? 'checked' : ''" v-if="historyByCard[historyKey]">
                <div :class="`color-box`"/>
                <th class="date">{{searchedMonth}}/{{historyByCard[historyKey].day}}</th>
                <th class="tag" :class="historyByCard[historyKey].tag.color">{{historyByCard[historyKey].tag.name | cut }}</th>
                <td class="price">¥ {{historyByCard[historyKey].price | priceComma}}</td>
                <td v-show="historyByCard[historyKey].cardFlg" class="card"><i class="fas fa-credit-card"></i></td>
                <td v-show="!historyByCard[historyKey].cardFlg" class="dummy-card"></td>
                <td class="desc">{{historyByCard[historyKey].desc}}</td>
                <td class="edit">
                  <span class="icon-pen" @click="editHistory(historyKey)"/>
                  <span class="icon-bin2" @click="deleteHistory(historyKey)"/>
                  <span class="icon-star-full" @click="checkHistory(historyKey)"/>
                </td>
              </tr>
            </div>
            <tr class="sum">
              <th>合計</th>
              <td>¥ {{sumByCard | priceComma}}</td>
            </tr>
          </table>
        </div>
        <div class="mode-select">
          <input type="checkbox" v-model="showHistoryByCard" id="credit"/>
          <label for="credit" class="custom-checkbox"/>
          <span>クレジットカード支払いのみ表示</span>
        </div>
      </div>

      <div class="contents__right">
        <button type="button" class="new" @click="showNewModal()"><i class="fas fa-feather"></i>記録をつける</button>
        <modal name="new-modal" :draggable="true" height="500px" >
          <!--新規記録作成フォーム!-->
          <h1 class="section-title">記録をつける</h1>
          <form>

            <div class="input-wrapper">
              <label for="date">日付選択</label>
              <v-date-picker color="pink" v-model="date" :mode="'single'"/>
            </div>

            <div class="input-wrapper">
              <label for="price">金額(カンマなし)</label>
              <span>¥</span>
              <input type="number" v-model="price"/>

              <div class="cardFlg-input">
                <input type="checkbox" v-model="cardFlg" id="card"/>
                <label for="card" class="custom-checkbox">
                  <span>クレジットカード</span>
                </label>
              </div>

              <label for="tag">分類タグ</label>
              <select v-model="selectedTag">
                <option v-for="(tag, key) in tags" :key="key" :value="tag.tag_id">{{key}}</option>
              </select>
              <p>または新規タグ作成(作成可能数:残り{{leftTagNum}}個)</p>
              <input type="text" v-model="newTag"/>
              <button class="create-btn" type="button" v-show="!loading" @click="createTag()" :disabled="noMoreTag">作成</button>

              <label for="desc">説明</label>
              <input type="text" v-model="desc"/>
            </div>

            <button class="create-btn" type="button" @click="createHistory()" v-show="!loading">決定</button>
            <LoadBar v-show="loading"/>

          </form>
        </modal>

        <h1 class="section-title"><i class="fas fa-tags"></i>Tags</h1>
        <div class="tags">
          <span @click="searchedTag=null, getTarget()" :class="!searchedTag ? 'active' : 'inactive'">ALL</span>
          <span class="tag" :class="[tag.color, searchedTag === tag ? 'active' : 'inactive']" v-for="(tag, key) in tags" :key="key" @click="searchedTag=tag, getTarget()">{{key}}</span>
        </div>
        <button @click="showTagModal">タグ名を編集</button>

        <!--タグ名編集画面!-->
        <modal name="tag-modal" height="300px">
          <h1>タグ名を編集する</h1>
          <form>
            <div class="input-wrapper">
              <label>編集するタグを選択</label>
              <select v-model="selectedTag">
                <option v-for="(tag, key) in tags" :key="key" :value="tag.tag_id" v-show="key!=='未分類'">{{key}}</option>
              </select>
              <label for="newTag">新タグ名</label>
              <input v-model="newTag" type="text"/>
              <button class="create-btn" type="button" v-show="!loading" @click="editTag()">編集</button>

              <LoadBar v-show="loading"/>
            </div>
          </form>
        </modal>

        <h1 class="section-title"><i class="fas fa-search"></i>日付から探す</h1>
        <v-date-picker v-model="searchedDate" color="pink" :mode="'single'"/>
      </div>

      <!--編集画面!-->
      <modal name="edit-modal" :draggable="true" height="500px">
      <h1 class="section-title">記録を編集する</h1>
        <form>
        <div class="input-wrapper">
          <label for="date">日付選択</label>
          <v-date-picker color="pink" v-model="date" :mode="'single'"/>
        </div>

        <div class="input-wrapper">
          <label for="price">金額(カンマなし)</label>
          <span>¥</span>
          <input type="number" v-model="price"/>

          <div class="cardFlg-input">
            <input type="checkbox" v-model="cardFlg"/>
            <label for="card" class="custom-checkbox">
              <span>クレジットカード</span>
            </label>
          </div>

          <label for="tag">分類タグ</label>
          <select v-model="selectedTag">
            <option v-for="(tag, key) in tags" :key="key" :value="tag.tag_id">{{key}}</option>
          </select>
          <p>または新規タグ作成(作成可能数:残り{{leftTagNum}}個)</p>
          <input type="text" v-model="newTag"/>
          <button class="create-btn" type="button" v-show="!loading" @click="createTag()" :disabled="noMoreTag">作成</button>

          <label for="desc">説明</label>
          <input type="text" v-model="desc"/>
        </div>

        <button class="create-btn" type="button" @click="updateHistory()" v-show="!loading">決定</button>
        <LoadBar v-show="loading"/>

        </form>
      </modal>

    </div>
  </div>
</template>

<script>
import { VCalendar, VDatePicker } from '@/plugins/v-calendar'
import VModal from '@/plugins/v-modal'
import { db } from '@/plugins/firebase'
import { getDocs, updateDoc, getDoc, doc, addDoc,
collection, query, orderBy, setDoc, deleteDoc, where } from 'firebase/firestore'
import moment from 'moment'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      currentNav: null,
      date: null,
      price: 0,
      selectedTag: null,
      newTag: null,
      desc: null,
      loading: false,
      tags: {},
      history: {},
      historyArray: [],
      cardFlg: false,
      showHistoryByCard: false,
      uid: this.$store.getters.currentUser.uid,
      searchedMonth: dayjs().month() + 1,
      searchedYear: dayjs().year(),
      editId: null,
      searchedDay: null,
      searchedTag: null,
      searchedDate: null,
      noMoreTag: false,
      showTable: true,
      checkFlg: false,
      targetPrice: 0,
      gapPrice: 0,
      pm: null
    }
  },
  watch: {
    uid: {
      hadler() {
        alert('ログイン期限が切れました。再度ログインしてください。')
        this.$router.push('/login')
      }
    },
    searchedDate: {
      handler() {
        this.getHistoryByDate()
      }
    },
    history: {
      handler() {
        // 順序を決める配列を生成
        this.historyArray = []
        // キーを含んだ配列に変換
        const array = Object.keys(this.history).map((key) => ({'key':key, 'day':this.history[key].day}))
        array.sort((a,b) => a.day - b.day)

        array.forEach((item) => {
          this.historyArray.push(item.key)
        })
      }
    }
  },
  filters: {
    priceComma(num) {
      let n = Number(num)
      return n.toLocaleString()
    },
    cut(tagName) {
      if(tagName.length >= 7) {
        const shortName = tagName.substr(0, 6) + '...'
        return shortName
      }
      return tagName
    }
  },
  computed: {
    leftTagNum() {
      const leftTagNum = 10 - Object.keys(this.tags).length
      if(leftTagNum === 0) this.noMoreTag = true
      return leftTagNum
    },

    tagsLength() {
      return Object.keys(this.tags).length
    },

    sum() {
      let sum = 0
      for(let key in this.history) {
        sum += Number(this.history[key].price)
      }
      return sum
    },

    gap() {
      const gap = this.targetPrice - this.sum
      if(gap > 0) this.pm = '-'
      else this.pm = '+'

      return Math.abs(gap)
    },

    historyByTag() {
      const historyByTag = {}
      for(let key in this.history) {
        if(this.history[key].tag.id == this.searchedTag.tag_id) {
          historyByTag[key] = this.history[key]
        }
      }
      return historyByTag
    },

    sumByTag() {
      let sumByTag = 0
      for(let key in this.historyByTag) {
        sumByTag += Number(this.historyByTag[key].price)
      }

      return sumByTag
    },

    gapByTag() {
      const gapByTag = this.targetPrice - this.sumByTag
      if(gapByTag > 0) this.pm = '-'
      else this.pm = '+'

      return Math.abs(gapByTag)
    },

    historyByCard() {
      const historyByCard = {}
      if(this.searchedTag) {
        for(let key in this.history) {
          if(this.history[key].tag.id == this.searchedTag.tag_id) {
            if(this.history[key].cardFlg == true) {
              historyByCard[key] = this.history[key]
            }
          }
        }
      } else {
        for(let key in this.history) {
          if(this.history[key].cardFlg == true) {
            historyByCard[key] = this.history[key]
          }
        }
      }
      return historyByCard
    },

    sumByCard() {
      let sumByCard = 0
      for(let key in this.historyByCard) {
        sumByCard += Number(this.historyByCard[key].price)
      }

      return sumByCard
    }

  },
  methods: {
    showNewModal() {
      this.loading = false
      this.date = null
      this.price = null
      this.selectedTag = null
      this.desc = null
      this.$modal.show('new-modal')
    },

    hideNewModal() {
      this.$modal.hide('new-modal')
    },

    showEditModal() {
      this.$modal.show('edit-modal')
    },

    hideEditModal() {
      this.$modal.hide('edit-modal')
    },

    showTagModal() {
      this.newTag = null
      this.selectedTag = null
      this.$modal.show('tag-modal')
    },

    hideTagModal() {
      this.$modal.hide('tag-modal')
    },

    async getTags() {
      this.tags = {}

      const querySnapshot = await getDocs(collection(db,
      'user', this.uid,
      'tags'))

      let count = 1

      querySnapshot.forEach((doc) => {
        const name = doc.data().name
        const tag_id = doc.id
        const color = doc.data().color

        const params = {
          tag_id : tag_id,
          color: color
        }
        this.$set(this.tags, name, params)

        count++
        if(count > 8) count = 1
      })
    },

    async createTag() {
      if(this.newTag) {
        this.loading = true
        const docRef = await addDoc(collection(db,
        'user', this.uid,
        'tags'), {
          name: this.newTag,
          color: 'color' + Number(this.tagsLength)
        })

        this.getTags()
        this.newTag = null
        this.loading = false
        this.selectedTag = null
      }
    },

    async createHistory() {
      if(this.date && this.price && this.selectedTag) {
        this.loading = true
      } else {
        return alert('未入力・選択項目があります。')
      }

      const formatedDate = moment(this.date).format('YYYY MM DD')

      const year = formatedDate.split(" ")[0]
      let month = formatedDate.split(" ")[1]
      const day = formatedDate.split(" ")[2]

      if(month.startsWith('0')) month = month.slice(1,2)

      const tagRef = doc(db,`user/${this.uid}/tags/${this.selectedTag}`)

      const docRef = await addDoc(collection(db,
      'kakeibo', this.uid,
      'years', year,
      'month', month,
      'day'), {
        day: Number(day),
        price: Number(this.price),
        tag: tagRef,
        desc: this.desc,
        cardFlg: this.cardFlg,
        checkFlg: false,
      })

      this.loading = false
      this.hideNewModal()
      this.getHistory(0)
    },

    async getHistory(calcNum) {
      let year = Number(this.searchedYear)
      let month = Number(this.searchedMonth)

      if(month === 1 && calcNum === -1) {
        year -= 1
        month = 12
      }
      else if(month === 12 && calcNum === 1) {
        year += 1
        month = 1
      }
      else {
        month = month + calcNum
      }

      this.searchedYear = year
      this.searchedMonth = month

      const Ref = collection(db,
      'kakeibo', this.uid,
      'years', String(year),
      'month', String(month),
      'day')

      const q = query(Ref, orderBy('day', 'asc'))
      const querySnapshot = await getDocs(q)

      // historyの初期化
      this.history = {}

      // 紐づいたタグをリファレンスで取得し、まとめてhistoryへ格納
      querySnapshot.forEach(async (doc) => {
        if(doc.data()) {
          const tagSnapshot = await getDoc(doc.data().tag)
          let tag_id = 0
          let tag_name = '未分類'

          //リファレンス先のタグが消えていた場合
          if(!tagSnapshot.data()) {
            tag_name = '未分類'
          } else {
            tag_id = tagSnapshot.id
            tag_name = tagSnapshot.data().name
            tag_color = tagSnapshot.data().color
          }

          const data = doc.data()
          data['tag'] = {id: tag_id, name: tag_name }
          this.$set(this.history, doc.id, data)
        }
      })
    },

    async getHistoryByDate() {
      const formatedDate = moment(this.searchedDate).format('YYYY MM DD')

      const year = formatedDate.split(" ")[0]
      let month = formatedDate.split(" ")[1]
      let day = formatedDate.split(" ")[2]

      if(month.startsWith('0')) month = month.slice(1,2)
      if(day.startsWith('0')) day = day.slice(1,2)

      const Ref = collection(db,
      'kakeibo', this.uid,
      'years', String(year),
      'month', String(month),
      'day')

      const q = query(Ref, where('day', '==', Number(day)))
      const querySnapshot = await getDocs(q)

      this.history = {}

      querySnapshot.forEach(async(doc) => {
        // 紐づいたタグをリファレンスで取得し、まとめてhistoryへ格納
        if(doc.data()) {
          const tagSnapshot = await getDoc(doc.data().tag)
          let tag_id = 0
          let tag_name = '未分類'

          //リファレンス先のタグが消えていた場合
          if(!tagSnapshot.data()) {
            tag_name = '未分類'
          } else {
            tag_id = tagSnapshot.id
            tag_name = tagSnapshot.data().name
          }

          const data = doc.data()
          data['tag'] = {id: tag_id, name: tag_name }
          this.$set(this.history, doc.id, data)
        }
      })

      this.searchedYear = Number(year)
      this.searchedMonth = Number(month)
      this.searchedDay = Number(day)
    },

    async resetHistory() {
      this.selectedTag = null
      this.searchedMonth = dayjs().month() + 1
      this.searchedYear = dayjs().year()
      this.searchedDay = null
      this.getHistory(0)
    },

    editHistory(key) {
      const historyDatum = this.history[key]
      this.price = historyDatum.price
      this.desc = historyDatum.desc
      this.cardFlg = historyDatum.cardFlg
      this.editId = key
      this.checkFlg = historyDatum.checkFlg

      // ずれ調整用
      let tmpMonth = this.searchedMonth - 1

      this.date = new Date(this.searchedYear, tmpMonth ,historyDatum.day)
      this.selectedTag = historyDatum.tag.id
      this.showEditModal()
    },

    async updateHistory() {
      if(this.date && this.price && this.selectedTag) {
        this.loading = true
      } else {
        alert('未入力・選択項目があります。')
      }

      const formatedDate = moment(this.date).format('YYYY MM DD')

      const year = formatedDate.split(" ")[0]
      let month = formatedDate.split(" ")[1]
      const day = formatedDate.split(" ")[2]

      if(month.startsWith('0')) month = month.slice(1,2)

      const tagRef = doc(db,`user/${this.uid}/tags/${this.selectedTag}`)

      // データ上書き処理
      const params = {
        day: Number(day),
        price: Number(this.price),
        tag: tagRef,
        desc: this.desc,
        cardFlg: this.cardFlg,
        checkFlg: this.checkFlg
      }

      try {
        setDoc(doc(db,
        'kakeibo', this.uid,
        'years', String(year),
        'month', String(month),
        'day', this.editId), params).then(() => {

          this.loading = false
          this.hideEditModal()
          this.getHistory(0)

        })
        // 元データと年/月が違う場合元データを削除
        if(year != this.searchedYear || month != this.searchedMonth) {
          await deleteDoc(doc(db,
          'kakeibo', this.uid,
          'years', String(this.searchedYear),
          'month', String(this.searchedMonth),
          'day', this.editId))
        }
      }
      catch(e) {
        alert('データの処理に失敗しました。時間をおいて再度お試しください。')
      }
    },

    async getHistory(calcNum) {
      let year = Number(this.searchedYear)
      let month = Number(this.searchedMonth)

      if(month === 1 && calcNum === -1) {
        year -= 1
        month = 12
      }
      else if(month === 12 && calcNum === 1) {
        year += 1
        month = 1
      }
      else {
        month = month + calcNum
      }

      this.searchedYear = year
      this.searchedMonth = month

      const Ref = collection(db,
      'kakeibo', this.uid,
      'years', String(year),
      'month', String(month),
      'day')

      const q = query(Ref, orderBy('day', 'asc'))
      const querySnapshot = await getDocs(q)

      // historyの初期化
      this.history = {}

      // 紐づいたタグをリファレンスで取得し、まとめてhistoryへ格納
      querySnapshot.forEach(async (doc) => {

        if(doc.data()) {
          const tagSnapshot = await getDoc(doc.data().tag)
          let tag_id = 0
          let tag_name = '未分類'
          let color = 'color0'

          //リファレンス先のタグが消えていた場合
          if(!tagSnapshot.data()) {
            tag_name = '未分類'
          } else {
            tag_id = tagSnapshot.id
            tag_name = tagSnapshot.data().name
            color = tagSnapshot.data().color
          }

          const data = doc.data()
          data['tag'] = {id: tag_id, name: tag_name, color: color }
          this.$set(this.history, doc.id, data)
        }
      })

      this.getTarget()
      this.sortHistory()
    },

    sortHistory() {
      // キーを含んだ配列に変換
      const array = Object.keys(this.history).map((key) => ({'key':key, 'day':this.history[key].day}))
      array.sort((a,b) => a.day - b.day)
      const sortedHistory = {}

      array.forEach((item) => {
        sortedHistory[item.key] = this.history[item.key]
      })

      this.history = sortedHistory
    },

    async deleteHistory(id) {
      if(confirm('データは復旧できません。本当に削除しますか？')) {
        await deleteDoc(doc(db,
        'kakeibo', this.uid,
        'years', String(this.searchedYear),
        'month', String(this.searchedMonth),
        'day', id))

        delete this.history[id]
        this.showTable = false
        this.showTable = true
      }
      else return
    },

    async checkHistory(key) {
      let checkFlg = false
      if(!this.history[key].checkFlg) checkFlg = true

      const Ref = doc(db,
      'kakeibo', this.uid,
      'years', String(this.searchedYear),
      'month', String(this.searchedMonth),
      'day', key)

      updateDoc(Ref, {
        checkFlg: checkFlg
      }).then(() => {
        this.getHistory(0)
      })

    },

    async getTarget() {
      const Ref = doc(db,
      'kakeibo', this.uid,
      'years', String(this.searchedYear),
      'month', String(this.searchedMonth))

      const querySnapshot = await getDoc(Ref)
      if(!this.searchedTag) {
        if(querySnapshot.data()) {
          if(querySnapshot.data().targetPrice) this.targetPrice = querySnapshot.data().targetPrice
          else this.targetPrice = 0
        }
        else this.targetPrice = 0
      }
      else {
        const fieldName = this.searchedTag.tag_id
        if(querySnapshot.data()) {
          if(querySnapshot.data()[fieldName]) this.targetPrice = querySnapshot.data()[fieldName]
          else this.targetPrice = 0
        }
        else this.targetPrice = 0
      }
    },

    async setTarget() {
      const Ref = doc(db,
      'kakeibo', this.uid,
      'years', String(this.searchedYear),
      'month', String(this.searchedMonth))

      if(!this.searchedTag) {
        setDoc(Ref, {
          targetPrice: Number(this.targetPrice)
        })
      } else {
        const param = {}
        param[this.searchedTag.tag_id] = Number(this.targetPrice)
        setDoc(Ref, param)
      }
    },

    async editTag() {
      if(!this.newTag) return alert('タグ名が空です。')

      this.loading = true
      const Ref = doc(db,
      'user', this.uid,
      'tags', this.selectedTag)

      updateDoc(Ref, {
        'name': this.newTag
      }).then(() => {
        this.newTag = null
        this.selectedTag = null

        this.getTags()
        this.getHistory(0)
        this.loading = false
        this.hideTagModal()
      })
    }
  },
  mounted () {
    this.getTags()
    this.getHistory(0)
  }
}
</script>