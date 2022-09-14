const gulp = require("gulp");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const replace = require("gulp-replace");
const plumber = require('gulp-plumber');
const fs = require('fs');

const EJScompile = (done) => {
	const json_path = "./data.json";
  const json = JSON.parse(new fs.readFileSync(json_path));

	gulp.src(["./src/page/*.ejs"])
		.pipe(plumber())
		.pipe(ejs({
			data: json
		}, {}, { ext: '.html' }))
		.pipe(rename({ extname: '.html' }))
		.pipe(replace(/^[ \t]*\n/gmi, ''))
		.pipe(gulp.dest("./public/"));
	done();
};

const watchFiles = (done) => {
	gulp.watch(["./src/**/*.ejs"], EJScompile);
	done();
};

exports.default = gulp.series([EJScompile, watchFiles]);