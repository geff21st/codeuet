<template>
  <div>
    <vue-qrcode :value="shareValue"
                :options="{ width: 500 }"
                class="qrcode d-flex"
    ></vue-qrcode>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { mapActions, mapState } from 'vuex'
import { WordsService } from '@/lib/wordsService'

// noinspection JSAnnotator
export default {
  name: 'Share',
  components: { VueQrcode },
  methods: {
    ...mapActions(['initializeGame'])
  },
  computed: {
    ...mapState(['words', 'userRole']),
    shareValue () {
      return WordsService.convertToCsv(this.words)
    }
  },
  mounted () {
    this.initializeGame()
  }
}
</script>

<style scoped lang="scss">
.qrcode {
  margin: auto;
  box-shadow: 0 0 4px #8a8681;
  border-radius: 16px;
  max-width: 100%;
  height: auto !important;
}
</style>
