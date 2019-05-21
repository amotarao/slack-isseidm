const { web } = require('../modules/slack');

module.exports = async (req, res) => {
  const { users, body } = req.body;

  const postRequest = users.map(user => {
    return new Promise((resolve, reject) => {
      web.chat.postMessage({
        channel: user,
        text: body,
        as_user: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          if ('ok' in error.data) {
            resolve(error.data);
          } else {
            reject(error);
          }
        });
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
