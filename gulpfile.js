// NOTE: Install all the necessary dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");
// NOTE: This sass.compiler allows us to chose node-sass or dart-sass (sass)
//NOTE: Je vais utiliser dart-sass puisque node-sass sera deprecated
sass.compiler = require("sass");
const htmlMin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
/**
 * NOTE: Transpiles our ES6 to ES5
 * @babel/core AND @babel/preset-env are needed for full transpilation to work
 */
const babel = require("gulp-babel");
//NOTE: Minifies our JS
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
  //TODO: Find my SCSS file in src folder
  return (
    gulp
      .src("./src/sass/**/*.scss")
      //TODO: Pass that file through Sass compiler - our gulp-sass package under the
      // name sass handles this.
      //TODO: Addition modify for better error output
      .pipe(sass().on("error", sass.logError))
      //TODO: Minify the newly transformed CSS
      .pipe(cleanCSS())
      //TODO: Output the transformed SCSS-come-minified CSS to our inside a CSS foler inside our dist folder
      .pipe(gulp.dest("./dist/css"))
      //QUESTION: What does this do again? watch Kevin Powell's gulp video to refresh
      .pipe(browserSync.stream())
  );
}

/**
 * TODO: Transpile our ES6 javascript to ES5. This is important
 * TODO: Minify our newly transpiled ES5 JS.
 */
function configureJS() {
  //TODO: Target desired file(s). Dans notre cas, c'est our index.js dedans le dossier src
  return (
    gulp
      .src("./src/js/*")
      /**
       * NOTE: This code below transpiles our ES6 to ES5.
       * IMPORTANT:NOTE: @babel/core and @babel/preset-env need to be installed along babel
       * don't forget the "gulp-" prefix
       */
      .pipe(
        babel({
          //NOTE: @babel/preset-env package makes this line work
          presets: ["@babel/preset-env"],
        })
      )
      .pipe(uglify())
      .pipe(gulp.dest("./dist/js"))
  );
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
