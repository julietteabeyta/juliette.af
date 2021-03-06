var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var webpack = require("webpack");
var webpackConfig = Object.assign({}, require("./webpack.config.js"));
var browserSync = require("browser-sync");

var htmlPaths = ["./src/*.html", "./src/**/*.html"];
var sassPaths = ["./src/sass/*.scss", "./src/sass/**/*.scss"];
var jsPaths = ["./src/js/*.js", './src/js/modules/*.js'];

gulp.task("sass", function(){
	return gulp.src("./src/sass/*.scss")
	  .pipe(sass().on("error", sass.logError))
	  .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	  .pipe(gulp.dest("./build/css/"))
	  .pipe(browserSync.stream());
});
gulp.task("js", function() {
	webpack(webpackConfig, function(err, stats) {
		browserSync.reload();
	})
})

gulp.task("watch", function(){
	gulp.watch(sassPaths, ["sass"]);
	gulp.watch(htmlPaths, ["html"]);
	gulp.watch(jsPaths, ["js"]);
});

gulp.task("server", function(){
	browserSync.init({server:{baseDir:"./build"}});
});

gulp.task("html", function(){
	return gulp.src(htmlPaths)
	  .pipe(gulp.dest("./build/"))
	  .pipe(browserSync.stream());
});

gulp.task("img", function(){
	return gulp.src(["./src/img/*"])
		.pipe(gulp.dest("./build/img/"));
});

gulp.task('models', function() {
	return gulp.src(["./src/models/*"]).pipe(gulp.dest("./build/models/"));
});

gulp.task('fonts', function() {
	return gulp.src(["./src/fonts/*"]).pipe(gulp.dest("./build/fonts/"));
});

gulp.task('static', function() {
	return gulp.src('./src/static/*').pipe(gulp.dest('./build/'))
})
gulp.task("assets", ['img', 'models', 'fonts', 'static']);

gulp.task("build", ["sass", "js", "html", "assets"]);

gulp.task("default", ["build", "watch", "server"]);
