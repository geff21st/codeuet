<template>
  <field-card :words="words" />
</template>

<script>
import FieldCard from '@/components/FieldCard'
import { mapActions, mapState } from 'vuex'

// noinspection JSAnnotator
export default {
  name: 'Field',
  components: { FieldCard },
  methods: {
    ...mapActions(['initializeGame'])
  },
  computed: {
    ...mapState(['words'])
  },
  mounted () {
    this.initializeGame()
  }
}
</script>
