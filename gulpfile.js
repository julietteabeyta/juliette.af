var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");

var htmlPaths = ["./src/*.html", "./src/**/*.html"];
var sassPaths = ["./src/sass/*.scss", "./src/sass/**/*.scss"];

gulp.task("sass", function(){
	return gulp.src("./src/sass/*.scss")
	  .pipe(sass().on("error", sass.logError))
	  .pipe(gulp.dest("./build/css/"))
	  .pipe(browserSync.stream());
});

gulp.task("watch", function(){
	gulp.watch(sassPaths, ["sass"]);
	gulp.watch(htmlPaths, ["html"]);
});

gulp.task("server", function(){
	browserSync.init({server:{baseDir:"./build"}});
});

gulp.task("html", function(){
	return gulp.src(htmlPaths)
	  .pipe(gulp.dest("./build/"))
	  .pipe(browserSync.stream());
});

gulp.task("assets", function(){
	return gulp.src(["./src/img/*"])
		.pipe(gulp.dest("./build/img/"));
})

gulp.task("build", ["sass", "html", "assets"]);

gulp.task("default", ["assets", "watch", "server"]);