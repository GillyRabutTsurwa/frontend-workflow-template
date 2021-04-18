const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("sass");
const htmlMin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function minifyHTML() {
  return gulp
    .src("./src/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./dist/"));
}

function style() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function configureJS() {
  return gulp
    .src("./src/js/*")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
}

function copyImages() {
  return gulp.src("./src/img/*").pipe(gulp.dest("./dist/img"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    browser: "firefox",
  });

  gulp.watch(
    ["./src/*.html", "./src/sass/**/*.scss", "./src/js/app.js"],
    gulp.parallel(minifyHTML, style, configureJS)
  );

  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/app.js").on("change", browserSync.reload);
}

exports.default = gulp.series(gulp.parallel(minifyHTML, style, configureJS), watch);

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.configureJS = configureJS;
exports.copyImages = copyImages;
exports.watch = watch;
