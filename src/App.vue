<template>
  <div class="d-flex d-flex--grow d-flex--100vh d-flex--column">
    <div id="nav" class="container" v-if="routeName !== 'Home'">
      <div class="nav-inner">
        <div class="d-flex d-flex--row">
          <button
            type="button"
            class="btn btn--red"
            @click="endCurrentGame"
            v-if="gameState === true"
          >
            Завершить игру
          </button>

          <router-link
            :to="{ name: 'Field' }"
            v-if="gameState !== true && routeName !== 'Field'"
            class="btn btn--green"
          >
            Начать игру
          </router-link>

          <router-link
            :to="{ name: 'Field' }"
            v-if="gameState === true && routeName !== 'Field'"
            class="btn btn--green"
          >
            К игровому полю
          </router-link>

          <router-link
            :to="{ name: 'Share' }"
            v-if="gameState === true && routeName !== 'Share'"
            class="btn"
          >
            Поделиться QR-кодом
          </router-link>
        </div>

        <div class="d-flex d-flex--row">
          <router-link to="/about" class="btn btn--round">?</router-link>
        </div>
      </div>
    </div>

    <router-view class="container d-flex d-flex--grow d-flex--column" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

// noinspection JSAnnotator
export default {
  computed: {
    ...mapState(['gameState']),
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    endCurrentGame () {
      if (!confirm('Завершить текущую игру')) return

      this.$store.dispatch('endCurrentGame')
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    const setVh = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      document.documentElement.setAttribute(
        'data-ratio',
        window.innerHeight > window.innerWidth
          ? 'vertical'
          : 'horizontal'
      )
    }

    // We listen to the resize event
    window.addEventListener('resize', setVh)
    Vue.nextTick(setVh)
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
root {
  background-color: #eee;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  position: relative;
}

#app {
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}

.d-flex {
  display: flex;

  &--row {
    flex-direction: row;
  }

  &--column {
    flex-direction: column;
  }

  &--grow {
    flex-grow: 1;
  }

  &--100vh {
    min-height: calc(var(--vh, 1vh) * 100);
  }
}

#nav {
  $h: 50px;

  height: $h;
  margin-bottom: 10px;
  overflow-x: auto;

  &:before {
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    height: $h;
    background-color: #ccc6be;
  }

  .nav-inner {
    position: relative;
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    min-width: 620px;
    padding-right: 10px;
  }

  .btn + .btn {
    margin-left: 18px;
  }
}

.container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.btn {
  cursor: pointer;
  border: none;
  background: #fff;
  border-radius: 5px;
  height: 28px;
  padding: 0 16px;
  box-shadow: 0 1px 3px -2px #000;
  color: #5a482f;
  font-size: 14px;

  &:focus,
  &:hover {
    outline: none;
    box-shadow: inset 0 1px 3px -1px rgba(#000, 0.8);
    //color: #000;
    text-shadow: 0 -1px 1px rgba(#000, 0.2);
    padding-top: 2px;
  }

  &--round {
    padding: 0 10px;
    border-radius: 15px;
    text-decoration: none;

    &:focus,
    &:hover {
      padding-top: 3px;
    }
  }

  @at-root a#{&} {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  &--red {
    background-color: #d64a4a;
    color: #fff;
  }

  &--gray {
    background-color: #aaa;
    color: #fff;
  }

  &--green {
    background-color: #718c53;
    color: #fff;
  }
}
</style>
