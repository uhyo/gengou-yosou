<template>
  <article>
    <h1>gengou page {{kanji.value}}</h1>
    <p>{{kanji.read}}</p>
  </article>
</template>
<script>
export default {
  validate({ params }) {
    // hex expression of 32bit integer
    return /^[0-9a-fA-F]{8}$/.test(params.gengou);
  },
  async asyncData({ params }) {
    const gengouCode = parseInt(params.gengou, 16);
    const { getGengouData } = await import('@/logic/kanji.js');
    return {
      kanji: getGengouData(gengouCode)
    };
  }
};
</script>
