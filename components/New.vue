<style lang="scss">

</style>
<template>
  <div class="new-view">
    <form>
      <label for="date">日付</label>
      <v-calendar v-model="date"></v-calendar>
    </form>
  </div>
</template>

<script>
import VCalendar from '@/plugins/v-calendar'

export default {

  data() {
    return {
      date: null,
    }
  }
}
</script>