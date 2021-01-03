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
        @click="switchState(i)"
      >
        <span v-if="isCellAgent(i)" class="card-cell-agent">
          <img :src="agentsAvailable[i % agentsAvailable.length]" :alt="'Агент #' + i">
        </span>

        <span v-if="isCellArrowDown(i)" class="card-cell-arrow card-cell-arrow--down">\/</span>
        <span v-if="isCellArrowUp(i)" class="card-cell-arrow card-cell-arrow--up">/\</span>

        <span v-text="word.text" class="word"></span>
      </div>
    </div>
  </div>
</template>

<script>
const CELL_STATE_NONE = 0
const CELL_STATE_AGENT = 10
const CELL_STATE_ARROW_UP = 20
const CELL_STATE_ARROW_DOWN = 30

export default {
  name: 'FieldCard',
  data () {
    return {
      size: 5,
      agentsAvailable: [
        'img/agent-1.jpg',
        'img/agent-2.jpg',
        'img/agent-3.jpg',
        'img/agent-4.jpg'
      ],
      cellStates: {},
      availableStates: [
        CELL_STATE_NONE,
        CELL_STATE_AGENT,
        CELL_STATE_ARROW_UP,
        CELL_STATE_ARROW_DOWN
      ]
    }
  },
  props: {
    words: Array
  },
  methods: {
    getCellState (index) {
      const cellState = this.cellStates[index] || 0
      return this.availableStates[cellState] || this.availableStates[0]
    },
    isCellAgent (index) {
      return this.getCellState(index) === CELL_STATE_AGENT
    },
    isCellArrowDown (index) {
      return this.getCellState(index) === CELL_STATE_ARROW_DOWN
    },
    isCellArrowUp (index) {
      return this.getCellState(index) === CELL_STATE_ARROW_UP
    },
    switchState (index) {
      let cellState = this.cellStates[index] || 0

      cellState = (cellState + 1) % this.availableStates.length

      if (!this.availableStates[cellState]) cellState = 0

      this.$set(this.cellStates, index, cellState)
    }
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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d8d1c7;
    border: 4px solid #eee;
    border-radius: 14px;
    box-shadow: inset 0 0 3px #00000055;
    position: relative;
    text-shadow: 0 1px 0 #ffffffcc;
    color: #222;
    overflow: hidden;

    &.green {
      background-color: #82b34a;
      color: #fff;
      text-shadow: 0 1px 1px #000000aa;
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
      background-color: #222;
      color: #fff;
      text-shadow: none;
    }
  }

  .word {
    pointer-events: none;
    user-select: none;
    display: flex;
    margin: auto;
    font-size: 13px;
    //letter-spacing: -0.9px;
    justify-content: center;
    font-weight: bold;
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

.card-cell-agent {
  z-index: 100;
  opacity: .6;

  &, img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  img {
    object-fit: cover;
    object-position: top center;
    display: block;
    width: 100%;
    height: 100%;
  }
}

.card-cell-arrow {
  position: absolute;
  font-size: 20px;
  font-family: monospace;
  letter-spacing: -4.2px;
  font-weight: bolder;

  &--up {
    top: 8px;
  }

  &--down {
    bottom: 8px;
  }
}
</style>
