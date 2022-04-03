<script>
import { Bar, Line } from 'vue-chartjs'
import { app, db } from '@/plugins/firebase'
import { getDocs, getDoc, doc, collection } from 'firebase/firestore'

export default {
  extends: Bar,
  props: {
    barYear: [String, Number],
    uid: String
  },
  data() {
    return {
      priceData: [],
      targetData: []
    }
  },
  watch: {
    barYear: {
      handler() {
        this.getTarget()
        this.getHistory()
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [{
          type: 'bar',
          label: '使用額の遷移(Monthly)',
          data: this.priceData,
          backgroundColor: [
            'rgba(139, 117, 120, 0.5)',
            'rgba(178, 168, 157, 0.5)',
            'rgba(129, 141, 141, 0.5)',
            'rgba(139, 117, 120, 0.5)',
            'rgba(178, 168, 157, 0.5)',
            'rgba(129, 141, 141, 0.5)',
            'rgba(139, 117, 120, 0.5)',
            'rgba(178, 168, 157, 0.5)',
            'rgba(129, 141, 141, 0.5)',
            'rgba(139, 117, 120, 0.5)',
            'rgba(178, 168, 157, 0.5)',
            'rgba(129, 141, 141, 0.5)',
          ],
          borderWidth: 1
        },
        {
          type: 'line',
          label: '設定目標額(Monthly)',
          data: this.targetData,
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
          borderWidth: 2,
          fill: false
        }],
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                  display:false
              }
            }],
            yAxes: [{
              gridLines: {
                display:false
              }
            }]
          }
        }
      }
    }
  },
  methods: {
    async getHistory() {
      this.searchedDay = null
      this.priceData = []

      for(let i = 1; i <= 12; i++) {
        const Ref = collection(db,
        'kakeibo', this.uid,
        'years', String(this.barYear),
        'month', String(i),
        'day')

        const querySnapshot = await getDocs(Ref)

        let sum = 0

        querySnapshot.forEach((doc) => {
          sum += doc.data().price
        })

        this.priceData.push(sum)
      }

      this.renderChart(this.chartData,this.chartData.options)
    },

    async getTarget() {
      this.targetData = []

      for(let i = 1; i <= 12; i++) {
        const Ref = doc(db,
        'kakeibo', this.uid,
        'years', String(this.barYear),
        'month', String(i))

        const querySnapshot = await getDoc(Ref)

        if(querySnapshot.data()) {
          if(querySnapshot.data().targetPrice) this.targetData.push(querySnapshot.data().targetPrice)
          else this.targetData.push(0)
        }
        else this.targetData.push(0)
      }
    }
  },
  mounted() {
    this.getTarget()
    this.getHistory()
  }
}
</script>