<template lang="pug">

div
  ul.list-group(v-if="questions && questions.length")
    
    li.list-group-item.list-group-item-info {{currentQuestion.question}}
    li.list-group-item
      ul.list-group
        label.mb-0.d-block(:for="`a-${index}`" v-for="(answer, index) in currentQuestion.answers" :key="index")
          li.list-group-item.user-select-none
              input.mr-2(type="radio" :id="`a-${index}`" name="answer" :value="answer" v-model="correctValue")
              span {{answer}}


    li.list-group-item.list-group-item-info.d-flex.align-items-center
      button(@click="previousAction" :class="getAnsweredQuestions.length > 0 ? 'btn btn-dark':'btn btn-info' " :disabled="!getAnsweredQuestions.length") #[i.mr-1.fa-solid.fa-chevron-left.fs-xs] Previous 
      button.btn.btn-dark.ml-2(@click="nextAction") Next #[i.ml-1.fa-solid.fa-chevron-right.fs-xs]
  Loading(v-else)
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Loading from "../../components/Loading.vue";

export default {
  components: { Loading },
  computed: {
    ...mapGetters({
      questions: "getQuestions",
      getAnsweredQuestions: "getAnsweredQuestions",
    }),
    currentQuestion() {
      return this.questions.find((i) => i.id == this.$route.params.id);
    },
  },

  data() {
    return {
      correctValue: null,
      isToggle: false,
    };
  },
  mounted() {
    if (this.questions.length) {
      const currentValue = this.getAnsweredQuestions.find(
        (i) => i.id == this.$route.params.id
      );
      this.correctValue = currentValue ? currentValue.value : null;
    }
  },

  methods: {
    ...mapMutations({
      setAnsweredQuestions: "setAnsweredQuestions",
    }),
    nextAction() {
      if (!this.correctValue) {
        this.$toast.error(`please, answer question.`, {
          position: "top",
          duration: 1000,
        });
      }

      if (this.correctValue) {
        this.setAnsweredQuestions({
          id: this.$route.params.id,
          value: this.correctValue,
        });

        this.correctValue = null;

        if (parseInt(this.$route.params.id) == this.questions.length) {
          this.$router.push("/result");
          return;
        }

        this.$router.push(`/question/${parseInt(this.$route.params.id) + 1}`);
      }
    },
    previousAction() {
      if (this.$route.params.id == 1) {
        return;
      }
      this.$router.push(`/question/${parseInt(this.$route.params.id) - 1}`);
    },
  },
};
</script>
<style lang="scss"></style>
