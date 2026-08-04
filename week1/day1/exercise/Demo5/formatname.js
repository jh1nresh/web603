function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const user = {
  firstName: "West",
  lastName: "Cliff"
};

const greeting = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(
  greeting,
  document.getElementById("root")
);

