const faker = require('faker');
const { saveCsv, toDatetime } = require('./common');

const TREE = [
  {
    left: 0,
    right: 13,
    level: 0
  },
  {
    left: 1,
    right: 8,
    level: 1
  },
  {
    left: 9,
    right: 12,
    level: 1
  },
  {
    left: 2,
    right: 5,
    level: 2
  },
  {
    left: 6,
    right: 7,
    level: 2
  },
  {
    left: 3,
    right: 4,
    level: 3
  },
  {
    left: 10,
    right: 11,
    level: 2
  }
];

const forums = [];
for (let forumId = 1; forumId <= TREE.length; forumId++) {
  const { left, right, level } = TREE[forumId - 1];
  const updatedAt = faker.date.past();

  forums.push([
    forumId,
    toDatetime(faker.date.past(1, updatedAt)),
    toDatetime(updatedAt),
    left,
    right,
    level,
    faker.lorem.sentence()
  ]);
}

saveCsv(forums, 'forums');

module.exports = {
  TREE
};
