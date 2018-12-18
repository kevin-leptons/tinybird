# Overview

An document system is represents by a directory. There are directory's
structure.

* `$SYS/` - Root of document system.
* `$SYS/index.yaml`. Contains information of document system.
* `$SYS/logo.png`. Logo of document system.
* `$SYS/$DOC`. Root of a document.
* `$SYS/$DOC/index.yaml`. Contains information of a document.
* `$SYS/$DOC/index.md`. Content of document.
* `$SYS/$DOC/$FILE`. Other files such as images.

File format.

* Configuration file `*.yaml` is written in YAML.
* Content file `*.md` is written in Markdown language.

# $SYS/index.yaml

## Attributes

Name            | Type      | Default   | Description
----------------|-----------|-----------|--------------------------------------
name            | string    |           | Name of document system
organization    | string    |           | Organization releases document system
tags[]          | array     |           | Array of tags
tags[].name     | string    |           | A tag

## Example

```yaml
name: Marvel Commics
organization: Marvel Entertainment, LLC
tags:
    - commics
    - fiction
```

# $SYS/$DOC/index.yaml

## Attributes

Name            | Type      | Default   | Description
----------------|-----------|-----------|--------------------------------------
name            | string    |           | Name of document
tags[]          | array     |           | Array of tags
tags[].name     | string    |           | A tag
path            | string    | null      | Path of document

## Example

```yaml
name: Hulk
path: public.hulk
tags:
    - green
    - big
    - angry
```

# $SYS/$DOC/index.md

See [Markdown](/doc/path/core.markdown)
