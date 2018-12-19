const path = require('path')

const {DocBuilder} = require('tinybird/service')

const {service} = require('./lib')

describe('class DocBuilder', () => {
    let doc_builder = service.get(DocBuilder)

    it('build a document', async () => {
        let example_dir = path.join(__dirname, 'example')
        let root = path.join(example_dir, 'root')
        let doc_dir = path.join(example_dir, 'other')
        let doc_cpp = path.join(example_dir, 'other_cpp')
        let doc_python = path.join(example_dir, 'other_python')
        let dest = path.join(__dirname, '../dest')

        doc_builder.set_root(root)
        doc_builder.add_many(doc_dir)
        doc_builder.add(doc_cpp)
        doc_builder.add(doc_python)
        await doc_builder.write(dest)
    })
})
