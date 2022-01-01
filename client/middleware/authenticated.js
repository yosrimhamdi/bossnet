export default function ({ store: { state }, redirect, route }) {
  if (!state.auth.loggedIn) redirect(`/signin?redirect=${route.path}`);
}
