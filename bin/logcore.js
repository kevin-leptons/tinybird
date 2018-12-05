#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {build_doc, App} = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('serve <src> <dest>', 'Build and serve document on HTTP', (yargs) => {
    yargs.
    option('port', {
        describe: 'Port to serve',
        alias: 'p',
        type: 'number',
        default: 5678
    })
}, (arg) => {
    cli_serve(arg).
    catch(e => {
        console.error(e)
        process.exit(1)
    })
}).

strict().
demandCommand().
help().
argv

async function cli_serve(conf) {
    await build_doc(conf.src, conf.dest)
    let app = new App({
        port: conf.port,
        root: conf.dest,
    })
    await app.serve()
}
