<template>
  <div class="loader-warp" v-if="loading">
  <div class="loader"></div>
</div>
</template>

<script>
export default {

  props: {
    loading: {
      type: Boolean,
      required: true,
    }
  }
};
</script>

<style scoped>
.loader-warp{
  position: fixed;
  width : 100vw;
  height : 100vh;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  opacity: 50%;
  z-index: 80;
}
.loader {
  width: 8px;
  height: 40px;
  border-radius: 4px;
  display: block;
  margin: 20px auto;
  /* position: relative; */
  background: currentColor;
  color: #ec1d1d;
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;

  position: fixed;
    top: 50vh;
    left: 50vw;
    z-index: 99;
}

.loader::after, .loader::before {
  content: '';
  width: 8px;
  height: 40px;
  border-radius: 4px;
  background: currentColor;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  box-sizing: border-box;
  animation: animloader 0.3s  0.45s  linear infinite alternate;
}
.loader::before {
  left: -20px;
  animation-delay: 0s;
}

@keyframes animloader {
  0%   { height: 48px} 
  100% { height: 4px}
}

</style>
