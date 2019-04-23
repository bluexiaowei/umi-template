export default {
  key: 'view',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any, context: any) {
    context.setState(state => {
      state.stageOpt.mode = state.stageOpt.mode === 'vertical' ? 'horizontal' : 'vertical';
      return state;
    });
  },
};
