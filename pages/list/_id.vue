<template>
  <no-ssr>
    <article class="container">
      <h1 class="page-title">新元号予想一覧 ({{pageId}}/{{pageTotal}})</h1>
      <list-of-gengous :gengous="gengous"/>
      <hr>
      <p>
        <span v-if="pageId > 1">
          <nuxt-link :to="`/list/${pageId-1}`" rel="prev">{{pageId-1}}</nuxt-link>
        </span>
        <b>{{pageId}}</b>
        <span v-if="pageId < pageTotal">
          <nuxt-link :to="`/list/${pageId+1}`" rel="next">{{pageId+1}}</nuxt-link>
        </span>
      </p>
    </article>
  </no-ssr>
</template>
<script>
import {
  getGengouByIndex,
  getGengouData,
  gengouNumber
} from '@/logic/kanji.js';
import { gengouIdString } from '@/logic/gengou-code.js';
import { pageLength } from '@/logic/list.js';
import ListOfGengous from '@/components/ListOfGengou.vue';

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  asyncData({ params, env, error }) {
    const id = parseInt(params.id, 10) - 1 || 0;
    const pageTotal = Math.ceil(gengouNumber / pageLength);
    if (id < 0 || id >= pageTotal) {
      error({
        statusCode: 404,
        message: 'そのページは存在しません。'
      });
      return;
    }
    return {
      pageId: id + 1,
      pageTotal,
      url: `${env.origin}/list/${id + 1}`
    };
  },
  computed: {
    gengous() {
      const gengous = [];
      const { pageId, pageTotal } = this;
      const id = pageId - 1;
      for (let idx = id * pageLength; idx < (id + 1) * pageLength; idx++) {
        const gengouId = getGengouByIndex(idx);
        if (gengouId == null) {
          break;
        }
        const gd = getGengouData(gengouId);
        gengous.push({
          value: gd.value,
          link: '/' + gengouIdString(gengouId) + '?random',
          gengouId
        });
      }
      return gengous;
    }
  },
  components: {
    ListOfGengous
  },
  head() {
    return {
      title: `一覧（${this.pageId}/${this.pageTotal}）`,
      meta: [
        {
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `新元号予想一覧（${this.pageId}/${this.pageTotal}）`
        }
      ]
    };
  }
};
</script>
