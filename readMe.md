# Gulp Front-End Workflow (v2)

## Voici quelques différence face à la première version
- Instead of writing our watch() separately for each task, we combine it into one method.
- The first arguement, instead of a singular task name, is an array of tasks, where as the second arguement, instead of the singular task to run, could be either the series() or the parallel() to run the tasks one by one or all simultaneously, respectively.

So this: 
```javascript
    gulp.watch("./src/*.html", minifyHTML);
    gulp.watch("./src/sass/**/*.scss", style);
    gulp.watch("./src/js/app.js", configureJS);
```
turned into this: 
```javascript
  gulp.watch(
    ["./src/*.html", "./src/sass/**/*.scss", "./src/js/app.js"],
    gulp.parallel(minifyHTML, style, configureJS)
  );
```
- Lastly and most importantly, we added a **default task**. This is a task that runs whenever we enter **gulp** in the command line. For our default task, we are running our **minifyHTML**, **style** and **configureJS** tasks simultaneously, and then running our **watch** task right after. Again, ce sera effectué des que l'on saissit **gulp** sur la ligne-commande:
  
```javascript
exports.default = gulp.series(gulp.parallel(minifyHTML, style, configureJS), watch);
```