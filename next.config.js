const SriPlugin = require('webpack-subresource-integrity');
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/horasextras',
          permanent: false,
        },
      ]
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: createSecureHeaders({
             contentSecurityPolicy: {
              directives: {
                defaultSrc: [
                  "'self'"
                ],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'"],
                baseUri: "self",
                formAction: "self",
                frameAncestors: true,
              },
            },
            frameGuard: "deny",
            noopen: "noopen",
            nosniff: "nosniff",
            xssProtection: "sanitize",
            forceHTTPSRedirect: [
              true,
              { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
            ],
            referrerPolicy: "same-origin",
          }),
        }
      ];
    },
    webpack(config) {
      config.output.crossOriginLoading = "anonymous";
      config.plugins.push(
        new SriPlugin({
          hashFuncNames: ["sha256", "sha384"],
          enabled: true,
        })
      );
  
      return config;
    }
  }