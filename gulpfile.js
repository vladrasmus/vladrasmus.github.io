let project_folder = "dist";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/"
  },
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/sass/style.sass",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.{woff,woff2,ttf,otf,eot}"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/sass/**/*.sass",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.{woff,woff2,ttf,otf,eot}",
    css2: source_folder + "/css/*.css"
  },
  clean: project_folder + "/"
};

const {src, dest} = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");

gulp.task("server",  function() {
  browserSync.init({
    server: {
      baseDir: project_folder,
    }
  });
});

gulp.task("html", function() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task("styles", function() {
  return src(path.src.css)
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(dest(path.build.css))
    .pipe(rename({extname: ".min.css"}))
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task("images", function() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task("watchFiles", function() {
  gulp.watch(path.watch.css, gulp.parallel("styles"));
  gulp.watch(path.watch.html, gulp.parallel("html"));
  // gulp.watch(path.watch.js).on("change", browserSync.reload);
  gulp.watch(path.watch.img, gulp.parallel("images"));
  gulp.watch(path.watch.css2, gulp.parallel("otherFiles"));
  gulp.watch(path.watch.fonts, gulp.parallel("fonts"));
});

gulp.task("otherFiles", function() {
  return src(source_folder + "/css/*.css")
    .pipe(dest(path.build.css));
});

gulp.task("fonts", function() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts));
});

gulp.task ("cleanAll", function() {
  return del(path.clean);
});

// gulp.task("watch", function() {
//   gulp.parallel("server", "html", "styles", "watchFiles");
// })

gulp.task("default", gulp.series("cleanAll", gulp.parallel("server", "html", "styles", "images", "watchFiles")));