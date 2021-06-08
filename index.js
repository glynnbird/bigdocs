const COUCH_URL = process.env.COUCH_URL
const COUCH_DATABASE = process.env.COUCH_DATABASE
const Nano = require('nano')
const nano = Nano({ url: COUCH_URL })
const MAX_SIZE = 1024 * 1024

const main = async () => {
  const db = nano.db.use(COUCH_DATABASE)
  let total = 0
  db.changesReader.get({ since: '0', includeDocs: true })
    .on('batch', (batch) => {
      total += batch.length
      process.stderr.write(`  ${total}    \r`)
      for(const change of batch) {
        // console.log(change.doc)
        const size = JSON.stringify(change.doc).length
        if (size > MAX_SIZE) {
          console.log(`${change.doc._id}\t${size}`)
        }
      }
    }).on('error', (e) => {
      console.error('error', e);
    }).on('end', () => {
      process.stderr.write(`  ${total} changes consumed - done\n`)
    })
}

main()
