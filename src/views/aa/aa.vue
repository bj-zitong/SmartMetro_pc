<template>
  <div class="top-navbar">
    222222
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Screenfull from '@/components/screenfull'
import ChangeTheme from '@/components/theme'
import CountUp from 'countup.js'
import { getHomeTotal, getHomeDetailItem, getRank } from '@/api/homepage'
import ColorLine from '@/components/color-line'
import NearSixMonth from '@/views/homepage/near-six-month'
import BScroll from 'better-scroll'
import InvestmentPie from '@/views/homepage/investment-pie'
import FinancingPie from '@/views/homepage/financing-pie'
export default {
  name: 'top-navbar',
  data() {
    return {

    }
  },
  name: '',
  methods: {
    ...mapActions({
      userLogout: 'logout'
    }),
    handleClick(tab, event) {
      this.$router.push('/aa')
    }
  }
}
</script>
<style lang="stylus">
</style>
