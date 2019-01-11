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
      <router-link to="/random" class="button--green">他の予想を見る</router-link>
      <a :href="tweet" target="_blank" class="button--blue">この予想をツイート</a>
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
  async asyncData({ params, env, query, redirect }) {
    const gengouCode = parseInt(params.gengou, 16);
    const {
      getGengouData,
      canonical,
      randomize
    } = await import(/*
      webpackPrefetch: true
    */ '@/logic/kanji.js');
    if ('random' in query) {
      // 'random' query parameter is specified.
      // redirect randomized URL.
      const newCode = randomize(gengouCode);
      redirect(303, '/' + gengouIdString(newCode));
      return;
    }
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
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `新元号予想「${this.gengou.value}」`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.gengou.description
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.canonicalUrl
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
  white-space: nowrap;
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
  min-height: 7em;
}

@media screen and (max-width: 480px) {
  .gengou {
    font-size: 24vmin;
  }
  .gengou rt {
    font-size: 9vmin;
  }
}
</style>
