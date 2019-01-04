<template>
  <article class="page">
    <h1>新元号予想</h1>
    <p class="gengou">
      <b>
        <ruby>
          {{gengou.value}}
          <rt>{{gengou.read}}</rt>
        </ruby>
      </b>
    </p>
    <h2>意義</h2>
    <p>{{gengou.description}}</p>
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
      gengou: getGengouData(gengouCode)
    };
  }
};
</script>
<style scoped>
.page {
  text-align: center;
}
h1 {
  font-size: 1.5em;
}
h2 {
  font-size: 1.1em;
}
.gengou {
  margin: 30px 0;
  font-size: 144px;
  font-family: serif;
}
.gengou rt {
  font-size: 54px;
}
.gengou b {
  font-weight: normal;
}
.gengou b::before {
  content: '【';
}
.gengou b::after {
  content: '】';
}
</style>
