var gulp = require("gulp");
var sass = require("gulp-sass");
var webpack = require("webpack");
var webpackConfig = Object.assign({}, require("./webpack.config.js"));
var browserSync = require("browser-sync");

gulp.task("sass", function(){
	return gulp.src("./src/sass/*.scss")
	  .pipe(sass().on("error", sass.logError))
	  .pipe(gulp.dest("./build/css/"))
	  .pipe(browserSync.stream());
});
gulp.task("js", function() {
	// var config = Object.assign({}, webpackConfig);
	webpack(webpackConfig, function(err, stats) {
		browserSync.reload();
	})
})

gulp.task("watch", function(){
	gulp.watch(["./src/sass/*.scss", "./src/sass/**/*.scss"], ["sass"]);
	gulp.watch("./src/*.html", ["html"]);
	gulp.watch("./src/js/*.js", ["js"]);
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

gulp.task("build", ["sass", "js", "html", "assets"]);

gulp.task("default", ["build", "watch", "server"]);