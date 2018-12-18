# tinydoc

Simple document system engine.

# Features

* Quite simple. Markdown is document language. Command line has minimum options
  for building and deployment.
* Flexible. Use as a small document system, personal blog... anything, depends
  on your imagination.
* Indexing. There are easy to searching documents by keywords.
* Lightweight. User Inteface runs on Web Browser, contains essential components,
  fast loading and easy to read.

# Usage

Install, require pre-installed Node.js and npm.

```bash
npm install -g tinydoc
```

Create a document system, for example about Marvel.

```bash
# root directory whichs contains document system
mkdir example

# root index file, contains system information
echo "name: Marvel Commics" > example/index.yaml

# first document about about Hulk
mkdir example/hulk

# index file of a document
cat <<EOT >> example/hulk/index.yaml
name: Hulk
tags:
    - green
    - big
    - angry
EOT

# content of document
cat <<EOT >> example/hulk/index.md
# Introduction

Hulk is green, big and angry guy.
EOT
```

Build and serve documents.

```bash
tinydoc dev example dest
```

Open "http://localhost:8080" on Web Browser and see document system.

References
==========

* Documents: https://tinydoc.herokuapp.com
