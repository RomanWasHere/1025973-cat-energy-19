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
    .pipe(gulp.dest("source/css"))
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
  return gulp.src("source/img/**/*.{png, jpg}")
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
    .pipe(posthtml({
      include()
    }))
    .pipe(gulp.dest("source"));
});

/* Таска для локального сервера */
gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});


// ------------------------------------------ //
// 03 СЕРИИ ТАСОК
// ------------------------------------------ //

gulp.task("start", gulp.series("css", "server"));


/* TODO:
1 - SVG
2 - Билд
3 - Webp -> в отдельный <picture type="image/webp"></picture>
*/