const proxy = require('cors-anywhere')

const originWhitelist = process.env.NAVIG8_CORS_PROXY_WHITELIST ?
    JSON.parse(process.env.NAVIG8_CORS_PROXY_WHITELIST) :
    []
const requireHeader = process.env.NAVIG8_CORS_PROXY_REQUIRED_HEADERS ?
    JSON.parse(process.env.NAVIG8_CORS_PROXY_REQUIRED_HEADERS) :
    ['origin', 'x-requested-with']

// Some of https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
const headersRemovedByDefault = ['cookie', 'cookie2', 'set-cookie', 'x-powered-by', 'x-aspnetmvc-version', 'x-dns-prefetch-control']
const removeHeaders = process.env.NAVIG8_CORS_PROXY_FILTER_HEADERS ?
    [...JSON.parse(process.env.NAVIG8_CORS_PROXY_FILTER_HEADERS), ...headersRemovedByDefault] :
    headersRemovedByDefault

proxy.createServer({
    originWhitelist,
    requireHeader,
    removeHeaders,
    redirectSameOrigin: true,
}).listen(9000, '0.0.0.0');
