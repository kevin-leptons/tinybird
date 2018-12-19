document.addEventListener('DOMContentLoaded', main, false)

const Mode = {
    normal: 'normal',
    insert: 'insert'
}

let search_box
let mode = Mode.normal

function main() {
    greating()
    index_elements()
    fill_search_box()
    load_key_map()
    reg_events()
}

function greating() {
    console.log('Hello there!. Javascript is running here')
    console.log('This is tinybird client');
}

function index_elements() {
    search_box = document.getElementById('search')
}

function fill_search_box() {
    let params = new URLSearchParams(window.location.search)
    let keyword = params.get('keyword')
    if (!keyword) {
        return
    }

    if (!search_box) {
        return
    }

    search_box.value = keyword
}

function load_key_map() {
    document.addEventListener('keydown', (evt) => {
        trigger_mode(evt)
    })
}

function trigger_mode(evt) {
    if (evt.ctrlKey || evt.shiftKey || evt.altKey) {
        return
    }
    switch (mode) {
        case Mode.normal:
            trigger_normal_shortcut_key(evt)
            break
        case Mode.insert:
            trigger_insert_shortcut_key(evt)
            break
    }
}

function trigger_normal_shortcut_key(evt) {
    switch (evt.code) {
        case 'Escape':
            enter_normal_mode()
            break
        case 'KeyI':
            enter_insert_mode()
            break
        case 'KeyJ':
            scroll_document_down()
            break
    }
    evt.preventDefault()
}

function trigger_insert_shortcut_key(evt) {
    switch (evt.code) {
        case 'Escape':
            enter_normal_mode()
            break
    }
}

function enter_normal_mode() {
    search_box.blur()
    mode = Mode.normal
    console.log('enter normal');
}

function enter_insert_mode() {
    search_box.focus()
    mode = Mode.insert
}

function reg_events() {
    reg_search_box_event()
}

function reg_search_box_event() {
    if (!search_box) {
        return
    }
    search_box.onfocus = () => {
        mode = Mode.insert
    }
    search_box.onblur = () => {
        mode = Mode.normal
    }
}
