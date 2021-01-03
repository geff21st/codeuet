<template>
  <div class="card-container">
    <div class="card" :class="'card--sz-' + size">
      <div
        class="card-cell"
        v-for="(word, i) in words"
        :key="i"
        :class="{
          green: word.agentCurrent === true,
          black: word.killerCurrent === true
        }"
        :data-index="i"
      >
        <span v-text="word.text" class="word"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldCard',
  data () {
    return {
      size: 5
    }
  },
  props: {
    words: Array
  }
}
</script>

<style scoped lang="scss">
.card-container {
  height: 100%;
  display: flex;
  padding-bottom: 10px;
}

.card {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: auto;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;

  + .card {
    margin-left: 10px;
  }

  &--sz-5 {
    .card-cell {
      width: (100% / 5);
      //padding-top: calc((100% / 5) - 8px);
    }
  }

  &-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d8d1c7;
    border: 4px solid #eee;
    border-radius: 14px;
    box-shadow: inset 0 0 3px #00000055;
    position: relative;
    text-shadow: 0 0 2px #fff;

    &.green {
      background-color: #82b34a;
      color: #fff;
      text-shadow: 0 0 2px #000;
    }

    &.red {
      // background-color: #f00;
      // border-color: #222;
      box-shadow: inset 0 0 4px 2px #ff000055;
    }

    &.blue {
      // background-color: #f00;
      background-color: blue;
    }

    &.black {
      background-color: #000;
      color: #fff;
    }
  }

  .word {
    display: flex;
    margin: auto;
    font-size: 13px;
    //letter-spacing: -0.9px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    //position: absolute;
    //top: 0;
    //right: 0;
    //bottom: 0;
    //left: 0;

    @at-root html[data-ratio=vertical] #{&} {
      transform: rotate(-65deg);
    }
  }
}
</style>
