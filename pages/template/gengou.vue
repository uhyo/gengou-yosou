<template>
  <GengouPage :gengouid="gengouid" :gengou="gengou" :url="url" :canonicalUrl="canonicalUrl"/>
</template>
<script>
import { gengouPageHead } from '@/logic/page/gengou-page.js';
import GengouPage from '@/components/GengouPage.vue';
export default {
  components: {
    GengouPage
  },
  async asyncData() {
    return {
      gengouId: '{{gengouId}}',
      gengou: {
        value: '{{value}}',
        read: '{{read}}',
        leftCode: '{{leftCode}}',
        rightCode: '{{rightCode}}',
        description: '{{description}}'
      },
      url: '{{url}}',
      canonicalUrl: '{{canonicalUrl}}'
    };
  },
  head() {
    return gengouPageHead(this);
  }
};
</script>
