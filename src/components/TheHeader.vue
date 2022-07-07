<template lang="pug">
.theHeader
    .container
        .d-flex.align-items-center
            span.fs-lg.text-white(to="/") Logo
            ul.py-0.pl-md-5.pl-2.m-0.d-flex.flex-wrap.align-items-center(v-if="questions && questions.length")
                li.px-2.fs-sm: span(:class="getAnsweredQuestions.length > 0 && getAnsweredQuestions.length < questions.length ? 'text-white':''") Previous
                li.px-2.fs-sm(:class="getAnsweredQuestions.length != questions.length ? 'text-white':''"): p.mb-0 #[i.mr-1.fa-solid.fa-circle-exclamation(:class="lengthClassStatus")] {{getAnsweredQuestions.length || '0'}} /10
                li.px-2.fs-sm: span(:class="getAnsweredQuestions.length < questions.length ? 'text-white':''") Next
                li.px-2.fs-sm: span(:class="getAnsweredQuestions.length == questions.length ? 'text-white':''") Results
            .d-flex.ml-3(v-else)
                Loading(color="white")
</template>
<script>
import { mapGetters } from "vuex";
import Loading from "./Loading.vue";

export default {
  name: "TheHeader",
  components: { Loading },

  computed: {
    ...mapGetters({
      questions: "getQuestions",
      getAnsweredQuestions: "getAnsweredQuestions",
    }),
    lengthClassStatus() {
      if (this.getAnsweredQuestions.length == "2") {
        return "text-warning";
      } else if (
        this.getAnsweredQuestions.length < this.questions.length &&
        this.getAnsweredQuestions.length > "2"
      ) {
        return "text-secondary";
      } else if (this.getAnsweredQuestions.length == this.questions.length) {
        return "text-success";
      }
    },
  },
};
</script>
