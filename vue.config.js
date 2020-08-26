module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 80,
    disableHostCheck: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9999',
    //     pathRewrite: { '^/api': '' },
    //     // secure: false,
    //     // followRedirects: true,
    //     onProxyReq: (proxyReq, req, res) => {
    //       try {
    //         proxyReq.setHeader('Host', req.hostname.split(':', 2)[0] + ':9999');
    //       } catch (e) {
    //         console.error(e);
    //       }
    //     }
    //   }
    // }
  }
}