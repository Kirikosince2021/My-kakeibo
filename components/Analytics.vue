<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/analytics.scss';
</style>

<style>
.bar-chart,.line-chart {
  width: 500px;
}
.pie-chart {
  widows: 300px;
}
</style>

<template>
  <div class="analytics-view">
    <div class="deco1 deco"/>
    <div class="deco2 deco"/>

    <div class="page-headding">
      <span>
        <i class="fas fa-chart-pie"></i>
        Analytics
      </span>
      <span>家計簿のデータから作成された分析を閲覧できます。</span>
      <div class="border"/>
    </div>
    <div class="analytics-view__body">
      <section class="analytics">
        <div class="analytics__chart bar-chart">
          <BarChart :barYear="barYear" :uid="uid"/>
        </div>
        <div class="analytics__desc">
          <p>家計簿記録データから作成された月毎の使用額の遷移を表したグラフです。</p>
          <table>
            <tr>
              <th>対象年:</th>
              <td>
                <select v-model="barYear">
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </td>
            </tr>
            <!--
            <tr>
              <th>対象月:</th>
              <td>
                <select name="startMonth">
                  <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                </select>
                <span>月~</span>
                <select name="endMonth">
                  <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                </select>
                <span>月</span>
              </td>
              <th></th>
            </tr>
            <tr>
              <th>最高額:</th>
              <td>x円</td>
            </tr>
            <tr>
              <th>最低額:</th>
              <td>y円</td>
            </tr>
            !-->
          </table>
        </div>
      </section>

      <div class="separation-border"/>

      <!--
      <section class="analytics">
        <div class="analytics__desc">
          <p>家計簿記録データのうち、タグがついている記録のみを対象とした比率グラフです。</p>
          <table>
            <tr>
              <th>対象年:</th>
              <td>
                <select name="year">
                  <option value="2021">2021</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>対象月:</th>
              <td>
                <select name="startMonth">
                  <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                </select>
                <span>月~</span>
                <select name="endMonth">
                  <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                </select>
                <span>月</span>
              </td>
              <th></th>
            </tr>
            <tr>
              <th>最高額:</th>
              <td>x円</td>
            </tr>
            <tr>
              <th>最低額:</th>
              <td>y円</td>
            </tr>
            <th>平均額:</th>
            <td>n円</td>
          </table>
        </div>
        <div class="analytics__chart pie-chart">
          <PieChart :pieYear="pieYear" :uid="uid" />
        </div>
      </section>
      !-->
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/Charts/Bar.vue'
import PieChart from '@/components/Charts/Pie.vue'
import dayjs from 'dayjs'

export default {
  components: { BarChart, PieChart },
  data() {
    return {
      loaded :false,
      barYear: dayjs().year(),
      pieYear: dayjs().year(),
      uid: this.$store.getters.currentUser.uid
    }
  },
  mounted() {
    this.loaded = true
  },
}
</script>