# logcore

Simple personal document engine.

## Usage

```bash
$ npm install logcore
$ npm serve DIRECTORY
```

Where DIRECTORY is directory which contains personal document. That documents
must follow logcore format. For example.

```text
doc
    |-bash
    |   |-asset
    |   |   |-logo.png
    |   |-index.json
    |   |-index.md
    |-python
    |   |-index.json
    |   |-index.md
    |-index.json
    |-icon.png
```

File index.json.


| Attribute     | Default           | Description                       |
|---------------|-------------------|-----------------------------------|
| name          |                   | Name of document                  |
