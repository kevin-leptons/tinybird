# Install

```bash
npm install logcore
```

```js
const logcore = require('logcore')
```

# logcore.dev(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer, String / 8080. Port which is listen by web service.
* conf.dist / Boolean / false. Optimize build files.

Build and serve document.

# logcore.build(src, dest, conf)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* conf / Object / {}.
* conf.dist / Boolean / false. Optimize build files.

Build documents.

# logcore.serve(dest, conf)

* dest / String. Path to build directory.
* conf / Object / {}.
* conf.port / Integer / 8080. Port to listen.

Serve build document on HTTP.
