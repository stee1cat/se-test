const faker = require('faker');
const { saveCsv, toDatetime, randomInt, TOPICS_COUNT, USERS_COUNT } = require('./common');

let messageId = 1;

const messages = [];
for (let topicId = 1; topicId <= TOPICS_COUNT; topicId++) {
  const count = topicId % 3 === 0 ? randomInt(3, 10) : randomInt(0, 2);

  for (let i = 0; i < count; i++) {
    const userId = randomInt(1, USERS_COUNT);
    const updatedAt = faker.date.past();

    messages.push([
      messageId,
      topicId,
      userId,
      toDatetime(faker.date.past(1, updatedAt)),
      toDatetime(updatedAt),
      faker.lorem.sentences()
    ]);

    messageId++;
  }
}

saveCsv(messages, 'messages');
