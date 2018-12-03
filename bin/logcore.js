#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {App} = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('serve <src> [dest]', 'Serve document on HTTP', (yargs) => {
    yargs.
    option('port', {
        describe: 'Port to serve',
        alias: 'p',
        type: 'number',
        default: 5678
    })
}, (arg) => {
    cli_serve(arg);
}).

strict().
demandCommand().
help().
argv

function cli_serve(conf) {
    new App({
        port: conf.port,
        src: conf.src,
        dest: conf.dest
    })
}
