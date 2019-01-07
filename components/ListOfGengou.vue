<template>
  <ul class="search-result">
    <li v-for="obj in gengous" v-bind:key="obj.gengouId">
      <router-link :to="obj.link">{{obj.value}}</router-link>
    </li>
  </ul>
</template>
<style>
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
<script>
export default {
  props: ['gengous']
};
</script>
