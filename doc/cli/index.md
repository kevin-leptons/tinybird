# tinydoc dev src dest [options]

* src / string. Path to document directory.
* dest / string. Path to build directory.
* --port, -p / integer / 8080. Port to listen.
* --dist / boolean / false. Optimize build files.
* --page-size, -s / integer / 16. Number of items in a result of a query.

Build and serve document.

# tinydoc build src dest [options]

* src / string. Path to document directory.
* dest / string. Path to build directory.
* --dist / boolean / false. Optimize build files.

Build documents.

# tinydoc serve dest [options]

* dest / string. Path to build directory.
* --port, -p / integer / 8080. Port to listen.
* --page-size, -s / integer / 16. Number of items in a result of a query.

Serve build document on HTTP.
