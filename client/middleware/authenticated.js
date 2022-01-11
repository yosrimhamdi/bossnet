export default function ({ store: { state }, redirect, route }) {
  if (!state.client) redirect(`/signin?redirect=${route.path}`);
}
