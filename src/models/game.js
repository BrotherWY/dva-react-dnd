
export default {

  namespace: 'game',

  state: {
    knightPosition: [0, 0],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(location => {
        if (location.pathname === '/') {
          dispatch({ type: 'init' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *init({ payload }, { call, put, take }) {
      const data = yield call(observe);
      yield put({ type: 'save', payload: { knightPosition: data } });
    },

    *moveKnight({ payload }, { call, put, select }) {  // eslint-disable-line
      const { toX, toY } = payload;
      yield put({ type: 'save', payload: { knightPosition: [toX, toY]} });
    },

    *canMove({ payload }, { call, put, select }) {
      const { knightPosition } = yield select(state => state.game);
      const [ x, y ] = knightPosition;
      const { toX, toY } = payload;
      const dx = toX - x;
      const dy = toY - y;
      yield ((Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2));
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

function observe() {
  return new Promise(resolve => {
    setTimeout(() => resolve([
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8)
    ]), 500)
  });
}
