const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const { join } = require('path')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)

environment.module = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
}

const sourcePath = join(environment.resolvedModules.get('source'), 'packs')

const resolveConfig = {
  resolve: {
    alias: {
      "@": `${sourcePath}`,
    }
  }
}
environment.config.merge(resolveConfig)

Object.keys(environment.entry.toObject()).forEach((key) => {
  environment.entry.delete(key)
})
environment.entry.set('home_vue', join(sourcePath, '/pages/home/home_main.js'))
environment.entry.set('task_vue', join(sourcePath, '/pages/task/task_main.js'))

console.log(environment)
module.exports = environment