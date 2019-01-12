// Server middleware for sitemaps

const origin = 'https://gengou-yosou.uhyo.space';

// XXX kanjiNumber is not automatically synced with data
const kanjiNumber = 2210;

const gengouNumber = kanjiNumber * kanjiNumber;

/**
 * Number of URLs which appear in one sitemap.
 */
const pageLength = 10000;

const pages = Math.ceil(gengouNumber / pageLength);

module.exports = (req, res) => {
  const url = req.url;
  if (url === '/') {
    sendIndex(res);
    return;
  }
  const r = url.match(/^\/(\d+)$/);
  if (r != null) {
    sendMap(res, parseInt(r[1]));
    return;
  }
};

/**
 * Send an index of sitemap.
 */
function sendIndex(res) {
  res.setHeader('Content-Type', 'application/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`);
  for (let i = 1; i <= pages; i++) {
    res.write(`<sitemap>
  <loc>${origin}/sitemap/${i}</loc>
</sitemap>`);
  }
  res.write(`</sitemapindex>`);
  res.end();
}

/**
 * Send one map.
 */
function sendMap(res, page) {
  if (page <= 0 || pages < page) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }
  const start = (page - 1) * pageLength;
  const end = Math.min(gengouNumber, page * pageLength);

  res.setHeader('Content-Type', 'application/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`);
  let buf = '';
  for (let i = start; i < end; i++) {
    const code = i.toString(16).padStart(8, '0');
    buf += `
  <url>
    <loc>${origin}/${code}</loc>
    <changefreq>yearly</changefreq>
  </url>
`;
    if (i % 1000 === 0) {
      res.write(buf);
      buf = '';
    }
  }
  res.write(buf);
  res.write(`
</urlset>
`);
  res.end();
}
