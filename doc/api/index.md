# Install

```bash
npm install tinydoc
```

```js
const tinydoc = require('tinydoc')
```

# tinydoc.dev(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer, String / 8080. Port which is listen by web service.
* conf.dist / Boolean / false. Optimize build files.
* conf.page_size / Integer / 16. Number of items in a result of a query.

Build and serve document.

# tinydoc.build(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.dist / Boolean / false. Optimize build files.

Build documents.

# tinydoc.serve(dest, conf)

* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer / 8080. Port to listen.
* conf.page_size / Integer / 16. Number of items in a result of a query.

Serve build document on HTTP.
