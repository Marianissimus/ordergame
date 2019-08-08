<template>
  <div>
    levels
  </div>
</template>

<script>
import store from '@/store'
import { mixins } from '@/mixins.js'

export default{
  mixins: [mixins],
  name: 'levels',
  data () {
    return {
      localMessage: 'choose level to play',
      localSubtitle: 'level selector'
    }
  }
}

</script>
