import staticServer from '@fly/static';
import {
  getGengouData,
  canonical,
  randomize,
  gengouNumber
} from './logic/kanji';
import { gengouIdString } from './logic/gengou-code';
import { pageLength } from './logic/list';

console.log('fly starting');
// cache setting
const cache = {
  // cache for pages
  page: 'public, max-age=86400, s-max-age=2592000',
  assets: 'public, max-age=2592000, immutable'
};

// number of pages
const pageNumber = Math.ceil(gengouNumber / pageLength);
const pageNumberRegExp = new RegExp(`1\\/${pageNumber}`, 'g');

// fly application
const staticRoute = staticServer({
  root: '/dist'
});
fly.http.respondWith(async request => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (/\/[0-9a-f]{8}$/i.test(pathname)) {
    // detected a URL of gengou page.
    return generateGengouPage(pathname.slice(1), url.search === '?random');
  } else if (/\/list\/\d+$/i.test(pathname)) {
    // detected a URL of gengou list page.
    return generateListPage(pathname.slice(6));
  } else if (/\/\w+$/.test(pathname)) {
    url.pathname += '/';
  }
  request.url = url;
  const res = await staticRoute(request);
  res.headers.set(
    'cache-control',
    url.pathname.endsWith('/') ? cache.page : cache.assets
  );
  return res;
});

// generate gengou page.
async function generateGengouPage(gengouCodeStr, random) {
  const gengouCode = parseInt(gengouCodeStr, 16);
  if (random) {
    const newCode = randomize(gengouCode);
    return Response.redirect('/' + gengouIdString(newCode), 303);
  }
  const templateRespP = fetch('file://dist/template/gengou/index.html');

  const gengou = getGengouData(gengouCode);
  const canonicalUrl = `${app.config.origin}/${gengouIdString(
    canonical(gengou.leftCode, gengou.rightCode)
  )}`;
  const replaceDict = {
    ...gengou,
    gengouId: gengouCodeStr,
    url: `${app.config.origin}/${gengouCodeStr}`,
    canonicalUrl
  };
  const templateResp = await templateRespP;
  if (templateResp.status !== 200) {
    return templateResp;
  }
  const body = await templateResp.text();
  const newBody = body.replace(
    /\{\{(\w+)\}\}/g,
    (_, name) => replaceDict[name]
  );
  const newResponse = new Response(newBody, templateResp);
  newResponse.headers.set('cache-control', cache.page);
  return newResponse;
}

// generate gengou list page.
async function generateListPage(pageId) {
  const pageNum = parseInt(pageId, 10);
  if (pageNum <= 0 || pageNum > pageNumber) {
    return new Response('not found', {
      status: 404
    });
  }
  const templateResp = await fetch('file://dist/list/1/index.html');
  const body = await templateResp.text();
  const newBody = body
    .replace(pageNumberRegExp, `${pageNum}/${pageNumber}`)
    .replace('pageId:1', `pageId:${pageNum}`);
  const newResponse = new Response(newBody, templateResp);
  newResponse.headers.set('cache-control', cache.page);
  return newResponse;
}
