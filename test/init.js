const {Store} = require('tinybird/service')

const {service} = require('./lib')

before(async () => {
    let store = service.get(Store)
    await store.renew()
})
after(async () => {
    await service.close()
})
