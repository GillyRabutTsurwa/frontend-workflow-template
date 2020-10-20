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

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    browser: "firefox",
  });

  gulp.watch("./src/*.html", minifyHTML);
  gulp.watch("./src/sass/**/*.scss", style);
  gulp.watch("./src/js/app.js", configureJS);

  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/app.js").on("change", browserSync.reload);
}

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.configureJS = configureJS;

exports.watch = watch;
