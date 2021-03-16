var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLEAPIKEY }).base(
  'appqtp2GaXkyb7uFX'
);

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    base('responses')
      .select({
        view: 'Grid view',
      })
      .firstPage(function (err, records) {
        if (err) {
          res.json(error);
          res.status(405).end();
          resolve();
          return;
        }

        res.statusCode = 200;
        res.json({ records });
        resolve();
      });
  });
};
