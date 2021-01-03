<template>
  <div>
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { WordsService } from '@/lib/wordsService'
import { mapGetters, mapMutations } from 'vuex'
import { USER_ROLE_RIGHT } from '@/data/constants'

// noinspection JSAnnotator
export default {
  name: 'Scan',
  components: { QrcodeStream },
  computed: {
    ...mapGetters(['wordsCount'])
  },
  methods: {
    ...mapMutations(['setUserRole', 'setWords', 'setGameState']),
    onDecode (...decodedData) {
      console.log({ decodedData })

      if (decodedData && decodedData[0]) {
        const parsedData = WordsService.normalizeFromCsv(decodedData[0], USER_ROLE_RIGHT)

        if (parsedData && parsedData.length === this.wordsCount) {
          this.setUserRole(USER_ROLE_RIGHT)
          this.setWords(parsedData)
          this.setGameState(true)

          this.$router.push({ name: 'Field' })
        }
      }
    }
  },
  mounted () {
  }
}
</script>
