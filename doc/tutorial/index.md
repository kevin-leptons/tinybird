# Installation

```bash
npm install -g tinydoc
```

# Create Document

We are going to make document system about Marvel. It contains a document
called `Hulk`.

Let's create files below.

* marvel - A directory represents for document system which called `Marvel`.
* [marvel/index.yaml](marvel/index.yaml) - Contains global information of
  document system.
* [marvel/logo.png](marvel/logo.png) - Logo file of document system.
* marvel/hulk - A directory represents for a document called `Hulk`.
* [marvel/hulk/index.yaml](marvel/hulk/index.yaml) - Contains local information
  of document.
* [marvel/hulk/index.md](marvel/hulk/index.md) - Content of document.
* [marvel/hulk/fig_001.jpg](marvel/hulk/fig_001.png) - An image.
* [marvel/hulk/fig_001.jpg](marvel/hulk/fig_001.png) - An other image.

# Show Document

```bash
tinydoc dev marvel build
```

This command does.

* Build document system in `marvel` directory and put results into `build`
  directory.
* Create HTTP server and serves document.

Follow the link which is printed to see document.

# More

* [Markdown References](/doc/path/core.markdown)
* [CLI References](/doc/path/core.cli)
* [API References](/doc/path/core.api)
