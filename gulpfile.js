var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

gulp.task("sass", function(){
	return gulp.src("./src/sass/*.scss")
	  .pipe(sass().on("error", sass.logError))
	  .pipe(gulp.dest("./build/css/"))
	  .pipe(browserSync.stream());
});

gulp.task("watch", function(){
	gulp.watch(["./sass/*.scss", "./sass/**/*.scss"], ["sass"]);
	gulp.watch("./build/*.html", ["html"]);
});

gulp.task("server", function(){
	browserSync.init({server:{baseDir:"./build"}});
});

gulp.task("html", function(){
	return gulp.src("./src/*.html")
	  .pipe(gulp.dest("./build/"))
	  .pipe(browserSync.stream());
});

gulp.task("assets", function(){
	return gulp.src(["./src/img/*"])
		.pipe(gulp.dest("./build/img/"));
})

gulp.task("build", ["sass", "html", "assets"]);

gulp.task("default", ["watch", "server"]);