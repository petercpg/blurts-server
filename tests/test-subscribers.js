"use strict";

require("dotenv").load();

const test = require("tape");

const Subscribers = require("../subscribers");
const DBUtils = require("../db-utils");

const tests = [];
tests.push({
  msg: "Test adding, getting, and deleting subscribers",
  callback: async (t) => {
    try {
      await DBUtils.setupDatabase();
    } catch (e) {
      t.fail(`Database setup failed:\n${e}`);
      return;
    }

    t.plan(5);

    const email = "test@test.com";

    let ret = await Subscribers.addUser(email);
    t.deepEqual(ret, {
      error: null,
    }, "Add a user.");

    ret = await Subscribers.getUser(email);
    t.deepEqual(ret, {
      error: null,
      email,
    }, "Get the same user.");

    ret = await Subscribers.addUser(email);
    t.deepEqual(ret, {
      error: null,
      duplicate: true,
    }, "Add the same user again.");

    ret = await Subscribers.deleteUser(email);
    t.deepEqual(ret, {
      error: null,
    }, "Delete the user.");

    ret = await Subscribers.getUser(email);
    t.ok(ret.error, "Try getting the user - should fail.");
  },
});

(async function runTests() {
  for (const t of tests) {
    test(t.msg, (testObj) => {
      (async () => {
        await t.callback(testObj);
      })();
    });
  }
})();