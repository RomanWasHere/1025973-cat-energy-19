"use strict";
// ------------------------------------------ //
// 01 ПАКЕТЫ
// ------------------------------------------ //
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");

/* Пакеты для минифаикации стилей */
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

/* Пакет для оптимизации изображений */
var imagemin = require("gulp-imagemin");

/* Пакет для изображений в WebP */
var webp = require("gulp-webp");

/* Пакет для сборки SVG спрайтов */
var svgstore = require("gulp-svgstore");

/* Пакеты для вставки спрайта в HTML */
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

/* Пакет для локального сервера */
var server = require("browser-sync").create();

/* Пакет для удаления файлов и папок */
var del = require("del");

/* Пакет для минификации и объединения JS файлов */
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/* Пакет для минификации HTML файлов */
var htmlmin = require('gulp-htmlmin');

// ------------------------------------------ //
// 02 ТАСКИ
// ------------------------------------------ //

/* Таска на обработку стилей */
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

/* Таска на оптимизации изображений */
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("source/img"));
});

/* Таска на конвертацию изображений в WebP */
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("source/img"));
});

/* Таска на сборку SVG спрайтов */
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

/* Таска на вставку спрайта в HTML */
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

/* Таска для локального сервера */
gulp.task("server", function () {
  server.init({
    server: "build/",
    // server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh")).on("change", server.reload);
  gulp.watch("source/js/**/*.js", gulp.series("scripts")).on("change", server.reload);
});

/* Таска для обновления сервера */
gulp.task("refresh", function (done) {
  server.reload();
  done();
});

/* Таска на копирование файлов в "build" */
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.html",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

/* Таска на очистку "build" */
gulp.task("clean", function () {
  return del("build");
});

/* Таска на сжатие JS файлов */
gulp.task("scripts", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(sourcemap.init())
    .pipe(concat("scripts.js"))
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest("build/js/"));
});

/* Таска на сжатие HTML файлов */
gulp.task("minify-html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

// ------------------------------------------ //
// 03 СЕРИИ ТАСОК
// ------------------------------------------ //

/* Серия тасок на сборку проекта */
gulp.task("build", gulp.series("clean", "copy", "css", "scripts", "sprite", "html", "minify-html"));

/* Серия тасок для разработки */
gulp.task("start", gulp.series("build", "server"));
