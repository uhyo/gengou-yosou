// search page store.

export const state = () => ({
  query: ''
});
export const mutations = {
  update(state, query) {
    state.query = query;
  }
};
