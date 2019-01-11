<template>
  <article class="container">
    <h1 class="page-title">新元号予想一覧 ({{pageId}}/{{pageTotal}})</h1>
    <list-of-gengous :gengous="gengous"/>
    <hr>
    <p>
      <span v-if="pageId > 1">
        <router-link :to="`/list/${pageId-1}`">{{pageId-1}}</router-link>
      </span>
      <b>{{pageId}}</b>
      <span v-if="pageId < pageTotal">
        <router-link :to="`/list/${pageId+1}`">{{pageId+1}}</router-link>
      </span>
    </p>
  </article>
</template>
<script>
import {
  getGengouByIndex,
  getGengouData,
  gengouNumber
} from '@/logic/kanji.js';
import { gengouIdString } from '@/logic/gengou-code.js';
import ListOfGengous from '@/components/ListOfGengou.vue';

/**
 * Number of gengous shown in one page.
 */
const pageLength = 1000;

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  asyncData({ params, env, error }) {
    const id = parseInt(params.id, 10) - 1 || 0;
    if (id < 0) {
      error({
        statusCode: 404,
        message: 'そのページは存在しません。'
      });
      return;
    }
    const gengous = [];
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
    if (gengous.length === 0) {
      error({
        statusCode: 404,
        message: 'そのページは存在しません。'
      });
      return;
    }
    return {
      pageId: id + 1,
      pageTotal: Math.ceil(gengouNumber / pageLength),
      url: `${env.origin}/list/${id + 1}`,
      gengous
    };
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
      ],
      link: [
        this.pageId > 1
          ? {
              rel: 'prev',
              href: `/list/${this.pageId - 1}`
            }
          : null,
        this.pageId < this.pageTotal
          ? {
              rel: 'next',
              href: `/list/${this.pageId + 1}`
            }
          : null
      ].filter(x => x)
    };
  }
};
</script>
