function make_description(doc) {
    let list_pair = [
        ['tags', doc.tags.join(' ')],
        ['modified', doc.modified]
    ]

    let list_str = list_pair.map(pair => {
        return `${pair[0]}: ${pair[1]}`
    })

    return list_str.join(', ')
}

module.exports = make_description
