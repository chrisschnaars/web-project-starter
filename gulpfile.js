// Gulp
const {gulp, src, dest, watch, series, parallel} = require('gulp');

// Gernal Packages
const browserSync = require('browser-sync').create();
const del = require("del");
const prefix = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// HTML
const htmlValidator = require('gulp-w3c-html-validator');

// Styles
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

// Scripts
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');

// Assets
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

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
    output: 'dist/js/'
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

// Lint scripts
const lintScripts = function (done) {
	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
};

// Build scripts
const buildScripts = function (done) {
  return src(paths.scripts.input)
    .pipe(sourcemaps.init())
    .pipe(babel(
      {presets: [
        "@babel/preset-env"
      ]}
    ))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(paths.scripts.output));
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
		buildScripts,
		lintScripts,
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
