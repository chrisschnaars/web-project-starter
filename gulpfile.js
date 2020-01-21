// Gulp
const {gulp, src, dest, watch, series, parallel} = require('gulp');

// Gulp Package
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require("del");
const htmlValidator = require('gulp-w3c-html-validator');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// Paths to project folders
const paths = {
  input: 'src/',
  output: 'dist/',
  html: {
    input: 'src/*.html',
    output: 'dist/'
  },
  styles: {
    input: 'src/scss/**/*.{scss,sass}',
    output: 'dist/css/'
  },
  scripts: {
    input: 'src/js/*',
    dist: 'dist/js/'
  },
  assets: {
    input: 'src/assets/**/*',
    output: 'dist/assets/'
  },
  reload: './dist/'
};


/*
** Gulp Tasks
*/

// Remove pre-existing content from output folders
const cleanDist = function (done) {
	// Clean the dist folder
	del.sync([
		paths.output
	]);

	// Signal completion
	return done();
};

// Copy html files into output folder
const html = function (done) {
  return src(paths.html.input)
    .pipe(htmlValidator())
    .pipe(htmlValidator.reporter())
    .pipe(dest(paths.html.output));
};

// Optimize Images
const images = function (done) {
  return src(paths.assets.input)
    .pipe(newer(paths.assets.output))
    .pipe(imagemin())
    .pipe(dest(paths.assets.output));
}

// Process, lint, and minify Sass files
const styles = function (done) {
	// Run tasks on all Sass files
	return src(paths.styles.input)
    .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(postcss([
			prefix({
				cascade: true,
				remove: true
			})
		]))
    .pipe(sourcemaps.write())
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(postcss([
			cssnano({
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(dest(paths.styles.output));
};

// Watch for changes to the src directory
const startServer = function (done) {
	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		}
	});

	// Signal completion
	done();
};

// Reload the browser when files change
const reloadBrowser = function (done) {
	browserSync.reload();
	done();
};

// Watch for changes
const watchSource = function (done) {
	watch(paths.input, series(exports.default, reloadBrowser));
	done();
};


/*
** Export Tasks
*/

// Default build task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		// buildScripts,
		// lintScripts,
		styles,
		images,
		html
	)
);

// Watch and reload
// gulp watch
exports.watch = series(
	exports.default,
	startServer,
	watchSource
);
