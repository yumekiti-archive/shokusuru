const gulp = require("gulp");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const replace = require("gulp-replace");
const plumber = require('gulp-plumber');
const fs = require('fs');

const path = ["./src/page/*.ejs", "!./src/_*.ejs"];

const EJScompile = (done) => {
	const json_path = "./data.json";
  const json = JSON.parse(new fs.readFileSync(json_path));

	gulp.src(path)
		.pipe(plumber())
		.pipe(ejs({
			jsonData: json
		}, {}, { ext: '.html' }))
		.pipe(rename({ extname: '.html' }))
		.pipe(replace(/^[ \t]*\n/gmi, ''))
		.pipe(gulp.dest("./public/"));
	done();
};

const watchFiles = (done) => {
	gulp.watch(path, EJScompile);
	done();
};

exports.default = gulp.series(watchFiles);