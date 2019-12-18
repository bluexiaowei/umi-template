// 将 namespace 重置为初始值
export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
    onReducer(reducer: any) {
      return (state: any, action: any) => {
        const newState = reducer(state, action);

        if (action.type === 'RESET_ALL') {
          window.g_app._models.forEach((item: any) => {
            if (item.namespace !== '@@dva') {
              newState[item.namespace] = item.state;
            }
          });
        }
        return newState;
      };
    },
  },
};
