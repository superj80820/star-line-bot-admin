<template>
  <div class="dashboard-container">
    <div class="dashboard-text">歡迎回來~</div>
    <img src="https://i.imgur.com/ssAt5FG.jpg" />
    <live2d />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import live2d from '@/components/live2d'

export default {
  name: 'Dashboard',
  components: {
    live2d
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  height: auto;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
