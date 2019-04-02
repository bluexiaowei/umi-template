// 将 namespace 重置为初始值
const reducerPluginsReset = reducer => {
  return (state, action) => {
    const newState = reducer(state, action);

    if (action.type === 'RESET') {
      window.g_app._models.forEach(item => {
        if (item.namespace !== '@@dva') {
          newState[item.namespace] = item.state;
        }
      });
    } else {
    }
    return newState;
  };
};

export const dva = {
  config: {
    onReducer: reducerPluginsReset,
    onError(e) {
      console.log(e);
    },
  },
  plugins: [],
};
