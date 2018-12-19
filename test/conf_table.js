const assert = require('assert')

const {ConfTable} = require('tinybird/service')

const {service} = require('./lib')

describe('class ConfTable', () => {
    let conf_table = service.get(ConfTable)
    let key1 = 'key1'
    let key2 = 'key2'
    let value1 = 'value1'
    let value2 = 'value2'

    it('set()', async () => {
        await conf_table.set(key1, value1)
        await conf_table.set(key1, value1)
        await conf_table.set(key2, value2)
    })

    it('list()', async () => {
        let conf = await conf_table.list()
        assert.equal(conf.get(key1), value1)
        assert.equal(conf.get(key2), value2)
    })
})
