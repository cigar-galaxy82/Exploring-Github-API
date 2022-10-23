require('dotenv').config()
const { SuperfaceClient } = require('@superfaceai/one-sdk');

const sdk = new SuperfaceClient();

async function findRepo(user) {
  // Load the profile
  const profile = await sdk.getProfile('vcs/user-repos@2.0.1');

  // Use the profile
  const result = await profile
    .getUseCase('UserRepos')
    .perform({
      user: user
    }, {
      provider: 'github',
      security: {
        basic: {
          username: process.env.USERNAME,
          password: process.env.PASSWORD
        },
        bearer_token: {
          token: process.env.TOKEN
        }
      }
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`Enter Username`, name => {
    findRepo(name)
    readline.close();
  });