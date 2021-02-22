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
  }