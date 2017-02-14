var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
      proxy: "http://localhost:3000",
      port: 8080,
      ui: {
    port: 8080 //levanta la interfaz de usuario de browserSync
    }
    });
    //gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("api-scm/public/*.html").on('change', browserSync.reload);
    gulp.watch("api-scm/public/*.js").on('change', browserSync.reload);
    gulp.watch("api-scm/public/bootstrap/css/*.css").on('change', browserSync.reload);
});
