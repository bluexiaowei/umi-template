import React from 'react';

export default function withHistory(WrappedComponent) {
  class WithHistory extends React.Component {
    history = [];
    reHistory = [];

    render() {
      const { add, undo, redo, clear, getData } = this;
      const { forwardedRef, ...other } = this.props;
      return (
        <WrappedComponent
          {...other}
          dataHistory={{ add, undo, redo, clear, getData }}
          ref={forwardedRef}
        />
      );
    }
    // 添加历史记录
    add = history => {
      this.history.push(JSON.stringify(history));
      this.reHistory = [];
    };
    // 撤销
    undo = () => {
      if (this.history.length > 1) {
        this.reHistory.push(this.history.pop());
        return JSON.parse(this.history[this.history.length - 1]);
      }
    };
    // 重做
    redo = () => {
      if (this.reHistory.length) {
        const now = this.reHistory.pop();
        this.history.push(now);
        return JSON.parse(now);
      }
    };
    // 清空数据
    clear = () => {
      this.history = [];
      this.reHistory = [];
    };
    // 获取历史记录集合
    getData = () => {
      const { history, reHistory } = this;
      return { history, reHistory };
    };
  }
  return React.forwardRef((props, ref) => <WithHistory {...props} forwardedRef={ref} />);
}
