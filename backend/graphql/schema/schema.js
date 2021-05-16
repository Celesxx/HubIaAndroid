const fs = require('fs');
const path = require('path');
const { buildSchema } = require("graphql");

try
{
    const data = fs.readFileSync(path.resolve(__dirname, "./schema.graphql"), "utf8");
    module.exports = buildSchema(data);
}
catch(err)
{
    console.error(err);
}