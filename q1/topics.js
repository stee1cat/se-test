const faker = require('faker');
const { saveCsv, toDatetime, randomInt, TOPICS_COUNT, USERS_COUNT } = require('./common');
const { TREE } = require('./forums');

const topics = [];
for (let topicId = 1; topicId <= TOPICS_COUNT; topicId++) {
  const forumId = randomInt(1, TREE.length);
  const userId = randomInt(1, USERS_COUNT);
  const updatedAt = faker.date.past();

  topics.push([
    topicId,
    forumId,
    userId,
    toDatetime(faker.date.past(1, updatedAt)),
    toDatetime(updatedAt),
    faker.lorem.sentence()
  ]);
}

saveCsv(topics, 'topics');
