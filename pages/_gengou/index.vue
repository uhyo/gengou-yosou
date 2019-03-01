<template>
  <GengouPage :gengouId="gengouId" :gengou="gengou" :url="url" :canonicalUrl="canonicalUrl"/>
</template>
<script>
import { gengouIdString } from '@/logic/gengou-code.js';
import { gengouPageHead } from '@/logic/page/gengou-page.js';
import GengouPage from '@/components/GengouPage.vue';
export default {
  components: {
    GengouPage
  },
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
  head() {
    return gengouPageHead(this);
  }
};
</script>
