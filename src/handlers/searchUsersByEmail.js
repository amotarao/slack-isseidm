const { web } = require('../modules/slack');

module.exports = async (req, res) => {
  const { email } = req.query;
  const emails = email.split(',');

  const searchRequest = emails.map(email => {
    return web.users.lookupByEmail({ email });
  })

  const slackResults = await Promise.all(searchRequest);

  const results = slackResults.map((result, i) => {
    return {
      ok: result.ok,
      email: emails[i],
      id: result.ok ? result.user.id : null,
    };
  })

  res.json({ results });
};
