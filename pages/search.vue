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
    <ListOfGengou :gengous="searchResult"/>
  </section>
</template>
<script>
import memoizeOne from 'memoize-one';
import ListOfGengou from '@/components/ListOfGengou.vue';
import { search, canonical } from '@/logic/kanji.js';
import { gengouIdString } from '@/logic/gengou-code.js';

const getSearchResult = memoizeOne(query => {
  return search(query).map(obj => {
    const gengouId = canonical(obj.leftCode, obj.rightCode);
    obj.gengouId = gengouId;
    obj.link = '/' + gengouIdString(gengouId);
    return obj;
  });
});
export default {
  components: {
    ListOfGengou
  },
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
      return this.invalid ? [] : getSearchResult(this.query);
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
</style>
