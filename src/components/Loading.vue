<template lang="pug">
.loading(:class="color")
</template>
<script>
export default {
  name: "Loading",
  props: {
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>
<style lang="scss">
.loading {
  display: block;
  margin: 0rem auto;
  width: 2rem;
  height: 2rem;
  border: 0.15rem solid rgba(0, 0, 0, 0.05);
  border-bottom-color: red;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
  &.white {
    border: 0.15rem solid rgba(255, 255, 255, 0.05);
    border-bottom-color: #fff;
    width: 1.2rem;
    height: 1.2rem;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
