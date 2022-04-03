<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/card-menu.scss';
</style>

<template>
  <div class="card-menu">
    <nav>
      <ul class="card-menu__list">
        <li class="menu-item1 folded" @mouseover="toggleMenu(1)" @click="$emit('changeMode', 'history')">
          <span>
            <i class="fas fa-book"></i>
            History
          </span>
        </li>
        <li class="menu-item2 folded" @mouseover="toggleMenu(2)" @click="$emit('changeMode','analytics')">
          <span>
            <i class="fas fa-chart-pie"></i>
            Analytics
          </span>
          </li>
        <li class="menu-item3" @mouseover="toggleMenu(3)" @click="$emit('changeMode', 'other')">
          <span>
            <i class="fas fa-wrench"></i>
            Other
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'history',
    }
  },
  methods: {
    toggleMenu(index) {
      const ulElem = document.querySelector('.card-menu__list')
      const listLength = ulElem.childElementCount

      for(let i = 1; i <= listLength; i++) {
        const elem = document.querySelector(`.menu-item${i}`)
        if(i === index) {
          elem.classList.remove('folded')
        }
        else {
          if(!elem.classList.contains('folded')) {
            elem.classList.add('folded')
          }
        }
      }

    }
  }
}
</script>

