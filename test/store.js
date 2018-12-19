const path = require('path')
const assert = require('assert')

const {service} = require('./lib')
const {Store} = require('tinybird/service')

describe('class Store', () => {
    let store = service.get(Store)

    it('renew()', async () => {
        await store.renew()
    })

    it('get()', () => {
        let conn = store.get()
        assert.notEqual(conn, null)
        assert.notEqual(conn, undefined)
    })
})
