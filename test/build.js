const path = require('path')

const {build} = require('logcore/builder')

describe('builder', () => {
    it('build()', () => {
        let example_dir = path.join(__dirname, 'example')
        let root = path.join(example_dir, 'root')
        let doc_dir = path.join(example_dir, 'other')
        let doc_cpp = path.join(example_dir, 'other_cpp')
        let doc_python = path.join(example_dir, 'other_python')
        let dest = path.join(__dirname, '../dest')

        build(root).
        add_many(doc_dir).
        add(doc_cpp).
        add(doc_python).
        write(dest)
    })
})
