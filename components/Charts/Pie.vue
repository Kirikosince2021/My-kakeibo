<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  computed: {
    chartData() {
      return {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        props: ['chartData', 'options'],
        datasets: [{
            label: '使用額の遷移(Monthly)',
            data: [10000, 120000, 9000, 12000, 5000,],
            backgroundColor: [
              'rgba(139, 117, 120, 1)',
              'rgba(178, 168, 157, 1)',
              'rgba(129, 141, 141, 1)',
              'rgba(139, 117, 120, 1)',
              'rgba(178, 168, 157, 1)',
              'rgba(129, 141, 141, 1)',
              'rgba(139, 117, 120, 1)',
              'rgba(178, 168, 157, 1)',
              'rgba(129, 141, 141, 1)',
              'rgba(139, 117, 120, 1)',
              'rgba(178, 168, 157, 1)',
              'rgba(129, 141, 141, 1)',
            ],
            borderWidth: 0
        }],
        options: {}
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData,this.chartData.options)
  }
}
</script>