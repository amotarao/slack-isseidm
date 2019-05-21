const { web } = require('../modules/slack');

module.exports = async (req, res) => {
  const { users, body } = req.body;

  console.log(users, body);

  const postRequest = users.map(user => {
    return web.chat.postMessage({
      channel: user,
      text: body,
      as_user: true,
    });
  })

  const slackResults = await Promise.all(postRequest);

  const results = slackResults.map((result, i) => {
    return {
      ok: result.ok,
      user: users[i],
    }
  })

  res.json({ results });
};
