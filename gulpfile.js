const gulp = require("gulp");
<<<<<<< HEAD
const sass = require("gulp-sass")(require("sass"));
=======
const sass = require("gulp-sass");
sass.compiler = require("sass");
>>>>>>> fbab2f2d7454d17a7a6f56696b4d6f882e7bab4a
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
<<<<<<< HEAD
=======
}

function copyImages() {
  return gulp.src("./src/img/*").pipe(gulp.dest("./dist/img"));
>>>>>>> fbab2f2d7454d17a7a6f56696b4d6f882e7bab4a
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    browser: "firefox",
  });

<<<<<<< HEAD
  gulp.watch(["./src/*.html", "./src/sass/**/*.scss", "./src/js/app.js"], gulp.parallel(minifyHTML, style, configureJS));
=======
  gulp.watch(
    ["./src/*.html", "./src/sass/**/*.scss", "./src/js/app.js"],
    gulp.parallel(minifyHTML, style, configureJS)
  );
>>>>>>> fbab2f2d7454d17a7a6f56696b4d6f882e7bab4a

  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/app.js").on("change", browserSync.reload);
}

exports.default = gulp.series(gulp.parallel(minifyHTML, style, configureJS), watch);

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.configureJS = configureJS;
<<<<<<< HEAD
=======
exports.copyImages = copyImages;
>>>>>>> fbab2f2d7454d17a7a6f56696b4d6f882e7bab4a
exports.watch = watch;
