// main.spec.js
const { app } = require("electron");

test("app is not null", () => {
  expect(app).not.toBeNull();
});
