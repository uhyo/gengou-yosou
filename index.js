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
  console.log(url.protocol);
  if (app.env === 'production' && url.protocol === 'http:') {
    url.protocol = 'https:';
    return new Response('Moved', {
      status: 301,
      headers: {
        Location: url.toString()
      }
    });
  }
  if (/^\/[0-9a-f]{8}$/i.test(pathname)) {
    // detected a URL of gengou page.
    return generateGengouPage(pathname.slice(1), url.search === '?random');
  } else if (/^\/list\/\d+$/i.test(pathname)) {
    // detected a URL of gengou list page.
    return generateListPage(pathname.slice(6));
  } else if (/^\/sitemap(?:\/\d+)?$/.test(pathname)) {
    return generateSitemap(pathname);
  } else if (/^\/\w+$/.test(pathname)) {
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
  newResponse.headers.set('content-type', 'text/html');
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
  newResponse.headers.set('content-type', 'text/html');
  return newResponse;
}

/**
 * Number of URLs which appear in one sitemap.
 */
const sitemapPageLength = 10000;
const sitemapPages = Math.ceil(gengouNumber / sitemapPageLength);

// generate sitemap page
function generateSitemap(pathname) {
  if (pathname === '/sitemap') {
    // send index of sitemap.
    return generateSitemapIndex();
  }
  const page = parseInt(pathname.slice(9), 10);
  if (page <= 0 || sitemapPages < page) {
    return new Response('Not found', {
      status: 404
    });
  }
  const start = (page - 1) * sitemapPageLength;
  const end = Math.min(gengouNumber, page * sitemapPageLength);

  let body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  for (let i = start; i < end; i++) {
    const code = i.toString(16).padStart(8, '0');
    body += `
  <url>
    <loc>${app.config.origin}/${code}</loc>
    <changefreq>yearly</changefreq>
  </url>
`;
  }
  body += `
</urlset>
`;
  const resp = new Response(body, { status: 200 });
  resp.headers.set('Content-Type', 'application/xml');
  resp.headers.set('Cache-Control', cache.page);
  return resp;
}

function generateSitemapIndex() {
  let body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  for (let i = 1; i <= sitemapPages; i++) {
    body += `<sitemap>
  <loc>${app.config.origin}/sitemap/${i}</loc>
</sitemap>`;
  }
  body += `</sitemapindex>`;
  const resp = new Response(body, {
    status: 200
  });
  resp.headers.set('Content-Type', 'application/xml');
  resp.headers.set('Cache-Control', cache.page);
  return resp;
}
