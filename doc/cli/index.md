# logcore build

```text
logcore build SRC DEST [OPTIONS]
```

Build source documents.

Argument        | default       | Description
----------------|---------------|---------------------------------------------
SRC             |               | Path to directory which contains documents
DEST            |               | Path to directory which store build files
--dist          | false         | Optimize build files for distribution

# logcore serve

```text
logcore serve DEST [OPTIONS]
```

Name            | default       | Description
----------------|---------------|---------------------------------------------
DEST            |               | Path to directory which contains build files
--port, -p      | 8080          | Port which is listen by web service

# logcore dev

```text
logcore dev SRC
```

Watch source documents and build if it changes. Build file is store in
`$HOME/logcore/$ID` where `$HOME` is home directory and `$ID` is hash of `src`.

Name            | default       | Description
----------------|---------------|---------------------------------------------
SRC             |               | Path to directory which contains documents
--port, -p      | 8080          | Port which is listen by web service
