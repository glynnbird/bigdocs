# bigdocs

Extract a single CouchDB database and calculate which documents are greater than 1MB in size.

## Installation

Clone this repo, then:

```sh
npm install
```

## Set environment variables

- `COUCH_URL` - the URL of your Cloudant service e.g. `https://user:pass@host.cloudant.com`.
- `COUCH_DATABASE` - the name of the database to inspect e.g. `mydb`

e.g.

```
export COUCH_URL="https://user:pass@host.cloudant.com"
export COUCH_DATABASE="mydb"
```

## Run

```sh
node index.js
```

The tool outputs

- a counter on `stderr` to show progress
- document ids whose document size exceeds 1MB

e.g.

```sh
node index.js
docid1	2000000
docid3  2500000
```

So it is useful to write the scripts output to a file e.g.

```sh
node index.js > docs.txt
```
