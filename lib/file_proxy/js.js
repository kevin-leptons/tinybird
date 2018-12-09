const minify_core = require('@node-minify/core');
const babel_minify = require('@node-minify/babel-minify');

const raw = require('./raw')

/*
Arguments.
    * src / String. Path to source file.
    * dest / String. Path to destination file.
    * conf / Object / {}.
    * conf.optimize / Boolean / false.
*/
async function copy_js(src, dest, conf={}) {
    if (conf.optimize) {
        await minify_core({
          compressor: babel_minify,
          input: src,
          output: dest
        });
    } else {
        raw.copy(src, dest)
    }
}

module.exports = {
    copy: copy_js
}
