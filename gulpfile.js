const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const pump = require('pump')

const paths = {
   html: {
      source: ['src/*.html'],
      build: 'dist'
   },
   images: {
      source: ['src/images/**/*'],
      build: 'dist/images'
   },
   fonts: {
      source: ['src/fonts/**/*'],
      build: 'dist/fonts'
   },
   scripts: {
      source: ['src/scripts/jQuery.js', 'src/scripts/bootstrap.min.js', 'src/scripts/**/*.js'],
      build: 'dist/scripts'
   },
   styles: {
      source: ['src/styles/bootstrap.min.css', 'src/styles/main.sass'],
      build: 'dist/styles'
   }
}

gulp.task('clean', () => {
   return del(['dist'])
})

gulp.task('html', () => {
   return gulp.src(paths.html.source)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.html.build));
});

gulp.task('sass', () => {
   return gulp.src(paths.styles.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.styles.build)); 
})

gulp.task('images', () => {
   return gulp.src(paths.images.source)
   .pipe(imagemin({optimizationLevel: 5}))
   .pipe(gulp.dest(paths.images.build))
})

gulp.task('fonts', () => {
   return gulp.src(paths.fonts.source)
   .pipe(gulp.dest(paths.fonts.build))
})

gulp.task('js', () => {
   return gulp.src(paths.scripts.source)
   .pipe(uglify())
   .on('error', err => {
      console.error("Uglify JS error: ", err.toString())
   })
   .pipe(concat('bundle.js'))
   .pipe(gulp.dest(paths.scripts.build))
})

gulp.task('watch', () => {
   gulp.watch(paths.html.source, ['html'])
   gulp.watch(['src/styles/**/*.sass'], ['sass'])
   gulp.watch(paths.images.source, ['images'])
   gulp.watch(paths.scripts.source, ['js'])
})

gulp.task('default', ['watch', 'html', 'sass', 'images', 'fonts', 'js'])
