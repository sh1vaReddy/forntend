module.exports = {
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'),
        async_hooks: require.resolve('async-hook-es3'),
        fs: require.resolve('fs-browserify'),
        stream: require.resolve('stream-browserify'),
        querystring: require.resolve('querystring-es3'),
        path: require.resolve('path-browserify'),
        buffer: require.resolve('buffer/'),
      },
    },
  };