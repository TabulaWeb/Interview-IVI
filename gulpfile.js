let project_folder = 'dist';
let source_folder = 'src';

let path = {
  build: {
    html: `${project_folder}`,
    css: `${project_folder}/static/css`,
    js: `${project_folder}/static/js/`,
    fonts: `${project_folder}/static/fonts/`
  },
  src: {
    html: `${source_folder}/*.pug`,
    css: `${source_folder}/static/scss/index.scss`,
    js: `${source_folder}/static/js/index.js`,
    fonts: `${source_folder}/static/fonts/*.ttf`
  },
  watch: {
    html: `${source_folder}/**/*.pug`,
    css: `${source_folder}/static/scss/**/*.scss`,
    js: `${source_folder}/static/js/**/*.js`,
  },
  clean: `./${project_folder}/`
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  del = require('del'),
  scss = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  claen_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  javascriptObfuscator  = require('gulp-javascript-obfuscator');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: `./${project_folder}/`
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(claen_css())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(
      uglify()
    )
    .pipe(javascriptObfuscator({
      compact: true
    }))
    .pipe(
      rename({
        extname: '.min.js'
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}


function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
