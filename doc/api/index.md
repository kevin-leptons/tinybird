# Install

```bash
npm install logcore
```

```js
const logcore = require('logcore')
```

# logcore.dev(src, options)

* src / String. Path to document directory.
* options / Object.
* options.port / Integer, String / 8080. Port which is listen by web service.

Watch files in source directory. If any files has changed then re-build.

# logcore.build(src, dest, options)

* src / String. Path to document directory.
* dest / String. Path to build directory.
* options / Object / {}.
* options.dist / Boolean / False. Enable optimize building for distribution.

Build documents in `src` and put build files into `dest` directory. Then
document can be serve by `logcore.serve()`.

# logcore.serve(dest, options)

* dest / String. Path to build document.
* options / Object / {}.
* options.port / Integer / 8080. Port which is listen by web service.

Serve build document on HTTP.
