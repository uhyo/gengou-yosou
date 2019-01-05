<template>
  <section class="container">
    <div>
      <h1 class="page-title">新元号予想サイト</h1>
      <p>このサイトでは、2019年4月1日に公表が予定されている新元号の独自予想を公開しています。</p>
      <div class="links">
        <router-link to="/random" class="button--green">予想を見る</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  asyncData({ env }) {
    return {
      origin: env.origin
    };
  },
  head: {
    meta: [
      {
        property: 'og:url',
        content: `${this.origin}/`
      }
    ]
  }
};
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
