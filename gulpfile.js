const fs = require('fs')

const gulp = require('gulp')
const gulpUtil = require('gulp-util')

const browserify = require('browserify')
const envify = require('envify/custom')
const tsify = require('tsify')
const watchify = require("watchify")

const ENTRY = {
  src: './src/index.ts',
  test: './test/test.ts'
}
const TSCONFIG = require('./tsconfig.json')
const ENV = {
  dev: { NODE_ENV: 'development' },
  prod: { NODE_ENV: 'production' }
}

gulp.task('default', [])

gulp.task('test:build', () => {
  const bundler = browserify()
    .add(ENTRY.test)
    .plugin(tsify, TSCONFIG.compilerOptions)
    .plugin(watchify)
    .transform(envify(ENV.dev))
    .on('update', bundle)
    .on('log', gulpUtil.log)
    .on('error', error => console.error(error.toString()))

  bundle()

  function bundle () {
    console.log()
    bundler.bundle().pipe(fs.createWriteStream('./test/test.js'))
  }
})
