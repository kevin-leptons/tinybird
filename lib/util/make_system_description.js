function make_system_description(conf) {
    let list_pair = [
        ['organization', conf.get('organization')],
        ['tags', conf.get('tags').join(' ')]
    ]

    let list_str = list_pair.map(pair => {
        return `${pair[0]}: ${pair[1]}`
    })

    return list_str.join(', ')
}

module.exports = make_system_description
