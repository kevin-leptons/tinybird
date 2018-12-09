const jimp = require('jimp')

/*
Arguments.
    * src / String. Path to source file.
    * dest / String. Path to destination file.
    * conf / Object / {}.
    * conf.size / Array<Integer> / null. Width x Height.
    * conf.quality / Integer / 90. Quality percent in range [0, 100].
    * conf
*/
async function convert_image(src, dest, conf={}) {
    let image = await jimp.read(src)

    if (conf.size) {
        image.resize(conf.size[0], conf.size[1])
    }
    image.quality(conf.quality)

    await image.write(dest)
}

module.exports = {
    convert: convert_image
}
