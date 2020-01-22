# Web Project Starter

A project boilerplate for personal web projects. Uses Gulp to compile lint all files, compile SCSS to CSS, concatenate and minimize CSS and JS files, and optimize images.

## Installation

1. Clone or download the repo.
2. Make sure you have installed [Node.js](http://nodejs.org/) and [Gulp Command Line Utility](http://gulpjs.com/).
3. Run `npm install` to install project dependencies.

## Using Gulp

There are two Gulp tasks that can be run:
- `gulp` will build your project files from the `src` directory into a `dist` directory.
- `gulp watch` will build the project and launch a [BrowserSync](https://browsersync.io/) server at [localhost:3000/](localhost:3000/) and automatically refresh any time changes are made in the `/src` folder.

## Documentation

All source files should live in the `src` directory. Gulp will build and serve these files from `dist`.  

- This template comes with a pre-organized set of SCSS files that follow [ITCSS Architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/). Put all new SCSS files inside of this directory, and Gulp will compile the SCSS into CSS, and put a minimized CSS file in `dist/css`.
- All JS files should live in the `src/js` folder. Gulp will lint, concatenate, and minimize these files into `src/js`.
- All assets (images, fonts, etc.) should live in `src/assets`. These will be optimized and placed into the `dist/assets` directory. Assets can (and should) live within subdirectories within `src/assets`.

## License

The code is available under the [MIT License](https://github.com/chrisschnaars/web-project-starter/blob/master/LICENSE.txt).
