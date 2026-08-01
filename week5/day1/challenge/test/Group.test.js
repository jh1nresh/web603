const assert = require("node:assert/strict");
const test = require("node:test");

const Group = require("../models/Group");

test("exports the Group model with the required schema fields", () => {
  assert.equal(Group.modelName, "Group");
  assert.equal(Group.schema.path("groupname").instance, "String");
  assert.equal(Group.schema.path("email").instance, "String");
  assert.equal(Group.schema.path("mobile").instance, "Number");
  assert.equal(Group.schema.path("profile").instance, "String");
  assert.equal(Group.schema.path("avatarimage").instance, "String");
});

test("accepts valid group data and converts groupname and email to lowercase", async () => {
  const group = new Group({
    groupname: "TEAM_7+WEB603",
    email: "TEAM.7+WEB603@EXAMPLE.COM",
    mobile: 1234567890,
    profile: "Factory pattern study group",
    avatarimage: "team-7.png"
  });

  await group.validate();

  assert.equal(group.groupname, "team_7+web603");
  assert.equal(group.email, "team.7+web603@example.com");
});

test("requires groupname and email", async () => {
  const error = new Group({}).validateSync();

  assert.equal(error.errors.groupname.kind, "required");
  assert.equal(error.errors.email.kind, "required");
});

test("rejects unsupported groupname characters", () => {
  const error = new Group({
    groupname: "team name",
    email: "team@example.com"
  }).validateSync();

  assert.equal(error.errors.groupname.kind, "regexp");
});

test("rejects an invalid email address", () => {
  const error = new Group({
    groupname: "team_7",
    email: "not-an-email"
  }).validateSync();

  assert.equal(error.errors.email.kind, "regexp");
});
