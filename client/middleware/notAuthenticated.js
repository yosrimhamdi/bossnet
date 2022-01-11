export default ({ store: { state }, redirect }) => {
  if (state.client) redirect("/client/tree");
};
