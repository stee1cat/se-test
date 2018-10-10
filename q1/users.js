const faker = require('faker');
const crypto = require('crypto');
const { saveCsv, toDatetime, USERS_COUNT } = require('./common');

function md5(string) {
  return crypto.createHash('md5')
    .update(string)
    .digest('hex');
}

const users = [];
for (let userId = 1; userId <= USERS_COUNT; userId++) {
  const { username, email } = faker.helpers.contextualCard();
  const password = faker.internet.password();
  const updatedAt = faker.date.past();

  users.push([
    userId,
    toDatetime(faker.date.past(1, updatedAt)),
    toDatetime(updatedAt),
    username,
    md5(password),
    email.toLowerCase()
  ]);
}

saveCsv(users, 'users');
