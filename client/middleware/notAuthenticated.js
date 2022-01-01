export default ({ store: { state }, redirect }) => {
  if (state.auth.loggedIn) redirect("/client");
};
