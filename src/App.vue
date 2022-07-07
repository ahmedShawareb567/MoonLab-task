<template lang="pug">
.app
  TheHeader
  .container
    .app-view
      router-view(:key="$route.path")

</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import { mapActions } from "vuex";

export default {
  components: {
    TheHeader,
  },
  mounted() {
    this.fetchQuestion();
  },
  methods: {
    ...mapActions({
      fetchQuestion: "fetchQuestion",
    }),
  },
};
</script>

<style lang="scss"></style>
