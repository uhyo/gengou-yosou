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
      <li v-for="obj in searchResult" v-bind:key="obj.gengouId">
        <router-link :to="obj.link">{{obj.value}}</router-link>
      </li>
    </ul>
  </section>
</template>
<script>
import { search, canonical } from '@/logic/kanji.js';
import { gengouIdString } from '@/logic/gengou-code.js';
export default {
  computed: {
    query: {
      get() {
        return this.$store.state.search.query;
      },
      set(query) {
        this.$store.commit('search/update', query);
      }
    },
    invalid() {
      return !/^[ぁ-ん]*$/.test(this.query);
    },
    searchResult() {
      return this.invalid
        ? []
        : search(this.query).map(obj => {
            const gengouId = canonical(obj.leftCode, obj.rightCode);
            obj.gengouId = gengouId;
            obj.link = '/' + gengouIdString(gengouId);
            return obj;
          });
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
