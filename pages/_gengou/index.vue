<template>
  <article class="container">
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
    <p class="description">{{gengou.description}}</p>

    <div class="links">
      <a :href="tweet" target="_blank" class="button--blue">この予想をツイート</a>
      <router-link to="/random" class="button--green">他の予想を見る</router-link>
    </div>
  </article>
</template>
<script>
import { gengouIdString } from '@/logic/gengou-code.js';
export default {
  validate({ params }) {
    // hex expression of 32bit integer
    return /^[0-9a-fA-F]{8}$/.test(params.gengou);
  },
  async asyncData({ params, env }) {
    const gengouCode = parseInt(params.gengou, 16);
    const {
      getGengouData,
      canonical
    } = await import(/*
      webpackPrefetch: true
    */ '@/logic/kanji.js');
    const gengou = getGengouData(gengouCode);
    const canonicalUrl = `${env.origin}/${gengouIdString(
      canonical(gengou.leftCode, gengou.rightCode)
    )}`;
    return {
      gengouId: params.gengou,
      gengou,
      url: `${env.origin}/${params.gengou}`,
      canonicalUrl
    };
  },
  computed: {
    tweet() {
      const {
        url,
        gengouId,
        gengou: { value }
      } = this;
      const text = `新元号予想「${value}」\n`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
        '新元号予想'
      )}`;
    }
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
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:title',
          content: `「${this.gengou.value}」`
        },
        {
          hid: 'og:description',
          content: this.gengou.description
        }
      ],
      link: [
        {
          rel: 'canonical',
          content: this.canonicalUrl
        }
      ]
    };
  }
};
</script>
<style scoped>
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
.description {
  text-align: justify;
}

@media screen and (max-width: 480px) {
  .gengou {
    font-size: 25vmin;
  }
}
</style>
