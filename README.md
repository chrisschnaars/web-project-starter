# Web Project Starter

A project boilerplate for personal web projects.

## Installation

1. Clone or download the repo.
2. Make sure you have installed [Node.js](http://nodejs.org/) and [Gulp Command Line Utility](http://gulpjs.com/).
3. Run `npm install` to install project dependencies.

## File Organization

-   All source files should live in the `src` directory.
-   All SCSS files live in `src/scss`. The folder organization in this directory follows [ITCSS Architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/).
-   All JS files should live in the `src/js` folder. All js modules live in the `/modules` folder.
-   All assets (images, fonts, etc.) should live in `src/assets`.

## Development

This boilerplate uses [Parcel](https://parceljs.org/) to bundle files, handle development tasks, and ultimately build the app. Use `npm run dev` to launch the server at [http://localhost:1234].

Notes:

-   Parcel reloads with each change made.
-   Parcel includes POSTCSS and Babel.

## Building

When you're ready to build the app, use `npm run build`.

## License

The code is available under the [MIT License](https://github.com/chrisschnaars/web-project-starter/blob/master/LICENSE.txt).
