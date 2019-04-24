module.exports = {
  configureWebpack: () => ({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        scss_vars: '@/assets/styles/scss/vars.scss',
        scss_about: '@/assets/styles/scss/about.scss',
      },
    },
  }),
  productionSourceMap: false,
};
