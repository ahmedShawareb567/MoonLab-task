<template lang="pug">
div
  table.table(v-if="getAnsweredQuestions && getAnsweredQuestions.length")
    thead
      tr
        th(colspan="4") Results
      tr.table-info
        th The Question
        th Correct Answer
        th your Answer
        th Points
    tbody
      tr(v-for="question in questions" :key="question.id")
        td {{question.question}}
        td {{question.correct_answer}}
        td(:class="getAnswer(question).value == question.correct_answer ? 'text-success' : 'text-danger'")
          i.mr-2.fa-solid.fa-circle-check(v-if="getAnswer(question).value == question.correct_answer")
          i.mr-2.fa-solid.fa-circle-xmark(v-else)
          span {{getAnswer(question).value}}
        td(:class="getAnswer(question).value == question.correct_answer ? 'text-success' : 'text-danger'") {{getAnswer(question).value == question.correct_answer ? '1': '0'}}

      tr.table-info
        th(colspan="3") Total Points
        th {{numberOfCorrectQuestions}}

</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      questions: "getQuestions",
      getAnsweredQuestions: "getAnsweredQuestions",
    }),
    numberOfCorrectQuestions() {
      let correctNo = 0;
      this.questions.forEach((question) => {
        const currentAnswer = this.getAnsweredQuestions.find(
          (answer) => answer.id == question.id
        );
        if (currentAnswer.value == question.correct_answer) {
          correctNo++;
        }
      });

      return correctNo;
    },
  },
  methods: {
    getAnswer(question) {
      return this.getAnsweredQuestions.find((i) => i.id == question.id);
    },
  },
};
</script>
<style lang="scss">
.table {
  border: 1px solid rgba(0, 0, 0, 0.1);
  tr:first-child {
    th {
      border: 1px solid rgba(0, 0, 0, 0.1) !important;
    }
  }
  tr {
    td,
    th {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
      border-right-color: transparent;
      border-left-color: transparent;
    }
  }
}
</style>
