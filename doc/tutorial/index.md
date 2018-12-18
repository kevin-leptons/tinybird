# Installation

```bash
npm install -g tinydoc
```

# Create Document

We are going to make music document set with a document called `Jazz`.
Let's create files below.

* [music/index.yaml](example/index.yaml)
* [music/logo.png](example/logo.png)
* [music/jazz/index.yaml](example/jazz/index.yaml)
* [music/jazz/index.md](example/jazz/index.md)
* [music/jazz/fig_001.jpg](example/jazz/fig_001.jpg)
* [music/jazz/fig_002.jpg](example/jazz/fig_002.jpg)

```text
music/
    |-jazz
    |   |-asset
    |   |   |-fig_001.jpg
    |   |   |-fig_002.jpg
    |   |-index.yaml
    |   |-index.md
    |-index.yaml
    |-logo.png
```


# Show Document

```bash
tinydoc dev music build
```

This command does.

* Build document in `music` directory and put build  files into `build`
  directory.
* Create HTTP server and serves document.

Follow the link which is printed to see document.

# More

* [Markdown References](/doc/path/core.markdown)
* [CLI References](/doc/path/core.cli)
* [API References](/doc/path/core.api)
