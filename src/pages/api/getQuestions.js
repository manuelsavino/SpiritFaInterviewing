import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLEAPIKEY }).base(
  'appqtp2GaXkyb7uFX'
);

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);
  const userId = session.user.sub;

  return new Promise((resolve, reject) => {
    base('questions')
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
});
