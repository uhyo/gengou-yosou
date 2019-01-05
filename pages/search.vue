<template>
  <section class="container">
    <h1 class="page-title">新元号予想を探す</h1>
    <p>
      <input
        class="search-input"
        v-bind:class="{invalid}"
        placeholder="新元号の読みをひらがなで入力"
        v-model.trim="query"
        pattern="[ぁ-ん]+"
      >
    </p>
    <ul class="search-result">
      <li v-for="obj in searchResult">{{obj.value}}</li>
    </ul>
  </section>
</template>
<script>
import { search } from '@/logic/kanji.js';
export default {
  data() {
    return {
      query: ''
    };
  },
  computed: {
    invalid() {
      return !/^[ぁ-ん]*$/.test(this.query);
    },
    searchResult() {
      return this.invalid ? [] : search(this.query);
    }
  }
};
</script>
<style scoped>
p {
  margin: 1em 0;
}
input.search-input {
  font-size: 1em;
  width: 100%;
}
input.search-input.invalid {
  background-color: #ffcccc;
}
ul.search-result {
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
}
ul.search-result li {
  list-style-type: none;
  margin: 0.4em;
}
</style>
