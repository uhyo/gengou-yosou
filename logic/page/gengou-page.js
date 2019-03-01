/**
 * Generate head of one gengou page.
 */
export function gengouPageHead({ url, canonicalUrl, gengou }) {
  return {
    title: `「${gengou.value}」`,
    meta: [
      {
        property: 'og:url',
        content: url
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `新元号予想「${gengou.value}」`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: gengou.description
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ]
  };
}
