const url = require('url')

const marked = require('marked')

const hash = require('./hash')

function doc_renderer(doc_id) {
    let renderer = new marked.Renderer()
    let base_url = '/asset/' + doc_id + '/'

     apply_heading_render(renderer)
     apply_link_render(renderer, base_url)
     return renderer
}

function apply_heading_render(renderer) {
    renderer.heading = (text, level) => {
        let id = hash.short(text)

        return `
            <h${level} id="${id}">
                <a href="#${id}" class="section-anchor">
                    ${text}
                </a>
            </h${level}>
        `
    }
}

function apply_link_render(renderer, base_url) {
    renderer.link = (href, title, text) => {
        let link = href[0] === '#' ? href : url.resolve(base_url, href)

        return `
            <a href="${link}" title="${title}">
                ${text}
            </a>
        `
    }
}

module.exports = doc_renderer
