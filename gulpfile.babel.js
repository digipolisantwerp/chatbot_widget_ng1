'use strict';

import helpers from 'astad-gulp-setup';
import gulp from 'gulp';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';
import connect from 'gulp-connect';
const wiredep = require('wiredep').stream;
import sass from 'gulp-sass';

const rp = require('request-promise');
const fs = require('fs');

const paths = {
    dist: 'dist',
    src: 'src',
    example: 'example'
};

gulp.task('eslint', function eslint() {
    return helpers.linter.eslint(path.join(paths.src, '**/*.js'), '.eslintrc.json');
});

gulp.task('sasslint', function sasslint() {
    return helpers.linter.sasslint(path.join(paths.src, 'css/scss/**/*.scss'));
});

gulp.task('sass', function sass() {
    return helpers.sass.compile(path.join(paths.src, 'css/scss/**/*.scss'), path.join(paths.dist, 'css'), true, 'akit.component.chatservicer-button.min.css', true, '', 'akit.component.chatservicer-button');
});

gulp.task('cleancss', function cleancss() {
    return del(path.join(paths.dist, 'css'));
});

gulp.task('cleanjs', function cleanjs() {
    return del(path.join(paths.dist, 'js'));
});

gulp.task('clean', ['cleanjs', 'cleancss']);

gulp.task('minify', function minify() {
    return helpers.build.buildJS('akit.component.chatservicer-button', paths.src, path.join(paths.dist, 'js'), false, 'akit.component.chatservicerButton', '/assets/chatservicer-button/');
});

gulp.task('test', function test(done) {
    return helpers.karma.singleRun({
        configFile: `${__dirname}/karma.conf.js`
    }, done);
});

gulp.task('test:continuous', function testC(done) {
    return helpers.karma.continuousRun({
        configFile: `${__dirname}/karma.conf.js`
    }, done);
});

gulp.task('bump:patch', () => { return helpers.version.increment('./package.json', ['./package.json', './bower.json'], 'patch'); });
gulp.task('bump:minor', () => { return helpers.version.increment('./package.json', ['./package.json', './bower.json'], 'minor'); });
gulp.task('bump:major', () => { return helpers.version.increment('./package.json', ['./package.json', './bower.json'], 'major'); });

gulp.task('buildjs', function buildjs(done) {
    return runSequence(
        'cleanjs',
        'minify',
        done
    );
});

gulp.task('buildcss', function buildcss(done) {
    return runSequence(
        'cleancss',
        'sasslint',
        'sass',
        done
    );
});

gulp.task('build', function build(done) {
    return runSequence(
        'buildjs',
        'buildcss',
        done
    );
});

gulp.task('buildprod', function buildprod(done) {
    return runSequence(
        'buildjs',
        'buildcss',
        done
    );
});

gulp.task('watchCss', function watchcss() {
    return gulp.watch(path.join(paths.src, 'css/scss/**/*.scss'), ['sasslint', 'sass']);
});

gulp.task('watchJs', function watchjs() {
    return gulp.watch(path.join(paths.src, 'js/**/*.js'), ['eslint', 'buildjs']);
});

gulp.task('watchTemplates', function watchtemplates() {
    return gulp.watch(path.join(paths.src, 'views/**/*.htm'), ['buildjs']);
});

gulp.task('watch', ['watchCss', 'watchJs', 'watchTemplates']);

gulp.task('default', function def(done) {
    return runSequence(
        'clean',
        'package',
        'wire',
        'watch',
        done
    );
});

gulp.task('package', function pack(done) {
    return runSequence.apply(null, ['clean', 'build', done]);
});

gulp.task('serve', function serve() {
    connect.server({
        root: './',
        livereload: true,
        port: 8001
    });
});

gulp.task('wire', function wire() {
    gulp.src('./example/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./example'));
});

gulp.task('teleportel-build-client', function () {
    return gulp.src('./teleportel-css-injection/scss/santwerp.client.scss')
        .pipe(sass())
        .pipe(gulp.dest('./teleportel-css-injection'));
});

gulp.task('teleportel-build-agent', function () {
    return gulp.src('./teleportel-css-injection/scss/santwerp.agent.scss')
        .pipe(sass())
        .pipe(gulp.dest('./teleportel-css-injection'));
});

gulp.task('teleportel-post-agent', function (done) {

    fs.readFile("./teleportel-css-injection/santwerp.agent.css", "utf-8", function (err, _data) {
        var options = {
            method: 'POST',
            uri: 'https://talk.attendedbyhumans.com/tbv1/custom_agent/write.php',
            form: {
                text: _data,
                agent: 'santwerp'
            }
        };

        rp(options)
            .then(function (body) {
                done();
            })
            .catch(function (err) {
                if (err.statusCode === 302) {
                    return done();
                }
                throw err;
            });
    });
});


gulp.task('teleportel-build', function (done) {
    return runSequence(
        'teleportel-build-client',
        'teleportel-build-agent',
        done
    );
});

gulp.task('teleportel-watch-agent', function () {
    gulp.watch(['./teleportel-css-injection/scss/agent/**/*.scss', './teleportel-css-injection/scss/common/**/*.scss', './teleportel-css-injection/scss/santwerp.agent.scss'], ['teleportel-build-agent', 'teleportel-post-agent']);
});

gulp.task('teleportel-watch', function () {
    gulp.watch('./teleportel-css-injection/**/*.scss', ['teleportel-build']);
});