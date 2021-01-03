<template>
  <div class="home">
    <router-link class="btn btn--green" :to="{ name: 'Field' }">
      Начать игру как игрок А
    </router-link>
    <router-link class="btn" :to="{ name: 'Scan' }">Отсканировать QR</router-link>
    <router-link to="/about" class="btn btn--gray">Правила игры</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .btn + .btn {
    margin-top: 20px;
  }

  .btn {
    height: 40px;
    font-size: 15px;

    &--green {
      background-color: #76a047;
    }
  }
}
</style>
