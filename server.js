const express = require("express")
const request = require("request")
const csv = require("csvtojson")

function compare(orderBy, direction) {
  if (direction && direction.toLowerCase() == 'dsc')
    return (a,b) => b[orderBy].localeCompare(a[orderBy])
  return (a,b) => a[orderBy].localeCompare(b[orderBy])
}

const app = express()

let all_organizations = []
const FIELDS = ['id', 'name', 'city', 'state', 'postal', 'category']

app.get('/organizations', async (req, res) => {
  let organizations = all_organizations
  for (const field of FIELDS) {   // filter the organizations by each field
    const query = req.query[field] ? req.query[field].toLowerCase() : null
    if (query)  // case-insensitive match, including substrings
      organizations = organizations.filter(org => org[field].toLowerCase().includes(query))
  }
  if (req.query.orderby)  // sort the results
    organizations = organizations.sort(compare(req.query.orderby, req.query.direction))
  res.send({ organizations })
})

const PORT = 3000
const URI = 'https://s3-us-west-2.amazonaws.com/sample-coding-dataset/organization_sample_data.csv'
csv().fromStream(request.get(URI)).then(result => { // get the data and then start the server
  all_organizations = result
  app.listen(PORT, () => console.log(`TreeTop app listening on port ${PORT}!`))
})
