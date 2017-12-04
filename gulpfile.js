// 引入
const gulp = require('gulp');
const webserver = require('gulp-webserver');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
// 启动服务
gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
            host: 'localhost',
            port: 8899,
            open: true,
            fallback: 'index.html',
            livereload: true
        }))
})
// 压缩CSS
gulp.task('minify', function(){
    gulp.src('./css/*.css')
        .pipe(concat('./newcss.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./newcss'))
})
//压缩JS
gulp.task('minjs', function(){
    gulp.src('./js/*.js')
        .pipe(concat('./newjs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./newjs'))
})
// 压缩HTML
gulp.task('htmlmin', function(){
    gulp.src('./index.html')
        .pipe(htmlmin({
            removeComments:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            collapseWhitespace:true,
            minifyCss:true,
            minifyJS:true
        }))
        .pipe(gulp.dest('./newhtml'))
})

gulp.task('default', function(){
    gulp.start("minify", "minjs", "htmlmin","webserver")//一会儿加上webserver
})