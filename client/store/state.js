export default () => ({
  header: {
    partners: [],
  },
  footer: {
    customPages: [],
  },
  client: null,
  // clientTree is global because is used by many children
  clientTree: {
    isLoading: true,
    clients: [],
    // for pagination ( using stack structure - LIFO )
    lastParents: [], 
  },
});
