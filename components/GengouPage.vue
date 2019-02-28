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
export default {
  props: ['url', 'gengouId', 'gengou', 'canonicalUrl'],
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
