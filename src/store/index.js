import { createStore } from "vuex";
import { $api } from "../axios";

export const store = createStore({
  state() {
    return {
      questions: [],
      answeredQuestions: [],
    };
  },
  getters: {
    getQuestions: (state) => state.questions,
    getAnsweredQuestions: (state) => state.answeredQuestions,
  },
  mutations: {
    setQuestions: (state, payload) => {
      const questions = [];

      payload.forEach((i, index) => {
        questions.push({
          id: index + 1,
          question: i.question,
          correct_answer: i.correct_answer,
          answers: [i.correct_answer, ...i.incorrect_answers].sort(
            () => 0.5 - Math.random()
          ),
        });
      });

      state.questions = questions;
    },
    setAnsweredQuestions: (state, payload) => {
      const answerIsExist = state.answeredQuestions.find(
        (i) => i.id == payload.id
      );

      if (answerIsExist) {
        answerIsExist.value = payload.value;
        return;
      }

      state.answeredQuestions.push(payload);
    },
  },
  actions: {
    async fetchQuestion({ commit }) {
      try {
        const {
          data: { results },
        } = await $api.get(
          "/api.php?amount=10&category=18&difficulty=medium&type=multiple"
        );

        commit("setQuestions", results);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
