const router = require('express').Router();
const TwitterApi = require('twitter-api-v2').default;

const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;
let verifier = '';

router.get('/init', async (req, res) => {
    const client = new TwitterApi({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });
    const auth_link = await client.generateOAuth2AuthLink(CALLBACK_URL, { scope: ['tweet.read', 'users.read', 'bookmark.read'] });
    console.log(auth_link);
    verifier = auth_link.codeVerifier;
    console.log(verifier);
    res.json(auth_link);
})

router.get('/search', async (req, res) => {
  // Extract state and code from query string
  console.log('/search');
  const { state, code } = req.query;
  console.log(req.query);
  console.log(verifier);
  console.log(req.session);
  
  // 처음 들어왔을 때
  if(!state && !code) {
    console.log("페이지 init")
  }
  if(!state) {
      console.log("에러")
  }
  if(!code) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  // Get the saved codeVerifier from session
  const { codeVerifier, state: sessionState } = req.session;
  // 일단 세션에 저장해놔야함

//   if (!codeVerifier || !state || !sessionState || !code) {
//     return res.status(400).send('You denied the app or your session expired!');
//   }
//   if (state !== sessionState) {
//     return res.status(400).send('Stored tokens didnt match!');
//   }

  // Obtain access token
  const client = new TwitterApi({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });
  console.log(code, verifier, CALLBACK_URL);
  
  client.loginWithOAuth2({ code, codeVerifier: verifier, redirectUri: CALLBACK_URL })
    .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      // {loggedClient} is an authenticated client in behalf of some user
      // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
      // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
      console.log("SSSS");

      // Example request
      console.log(loggedClient);
      console.log(accessToken);
      try{
        const data = await loggedClient.v2.me();
        console.log(data);
      } catch(e) {
          console.log(e);
      }
      
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
});

module.exports = router;