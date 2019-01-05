<template>
  <article class="page">
    <h1 class="page-title">新元号予想</h1>
    <p class="gengou">
      <b>
        <ruby>
          {{gengou.value}}
          <rt>{{gengou.read}}</rt>
        </ruby>
      </b>
    </p>
    <h2 class="page-section">意義</h2>
    <p>{{gengou.description}}</p>

    <div class="links">
      <router-link to="/random" class="button--green">他の予想を見る</router-link>
    </div>
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
    const {
      getGengouData
    } = await import(/*
      webpackPrefetch: true
    */ '@/logic/kanji.js');
    return {
      gengouId: params.gengou,
      gengou: getGengouData(gengouCode)
    };
  },
  head() {
    return {
      title: `「${this.gengou.value}」`,
      meta: [
        {
          hid: 'title',
          content: `「${this.gengou.value}」`
        },
        {
          hid: 'og:url',
          content: `${process.env.origin}/${this.gengouId}`
        },
        {
          hid: 'og:title',
          content: `「${this.gengou.value}」`
        },
        {
          hid: 'og:description',
          content: this.gengou.description
        }
      ]
    };
  }
};
</script>
<style scoped>
.page {
  text-align: center;
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
