const mongoose = require("mongoose");

const groupnamePattern = /^[a-z0-9!@#$%^&?*+\-_.]+$/;
const emailPattern =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

const GroupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    lowercase: true,
    required: true,
    match: [groupnamePattern, "Group name contains invalid characters"]
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [emailPattern, "Email address is invalid"]
  },
  mobile: {
    type: Number
  },
  profile: {
    type: String
  },
  avatarimage: {
    type: String
  }
});

module.exports = mongoose.model("Group", GroupSchema);
