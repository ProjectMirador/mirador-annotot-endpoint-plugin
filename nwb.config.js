module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MiradorAnnototEndpoint',
      externals: {
        react: 'React'
      }
    }
  }
}
