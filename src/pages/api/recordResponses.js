var Airtable = require('airtable');
const { v4: uuidv4 } = require('uuid');
var base = new Airtable({ apiKey: process.env.AIRTABLEAPIKEY }).base(
  'appqtp2GaXkyb7uFX'
);

export default async (req, res) => {
  console.log('hi');
  const data = req.body;

  const candidateName = data.__candidateName;
  const interviewer = data.__interviewer;

  delete data.__candidateName;
  delete data.__interviewer;

  base('responses').create(
    [
      {
        fields: {
          id: uuidv4(),
          candidateName: candidateName,
          data: JSON.stringify(data),
          interviewer: interviewer,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      res.statusCode = 200;
      res.json({ records });
    }
  );
};
