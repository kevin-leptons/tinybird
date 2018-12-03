const assert = require('assert')

const {DocumentTable} = require('logcore/service')

const {service} = require('./lib')

describe('class DocumentTable', () => {
    let document_table = service.get(DocumentTable)
    let document_name = 'the moon'
    let document_id

    it('create()', async () => {
        let doc = {
            path: '/ext/the_moon',
            name: document_name,
            tags: ['tag1', 'tag2']
        }
        document_id = await document_table.create(doc)
    })

    it('find()', async () => {
        let doc = await document_table.find(document_id)
        assert(doc)
    })

    it('list()', async() => {
        let docs = await document_table.list()
        assert.equal(docs.constructor, Array)
        assert(docs.length > 0)
    })

    it('list() with keyword', async() => {
        let docs = await document_table.list('the')
        assert.equal(docs.constructor, Array)
        assert(docs.length > 0)
    })
})
