export default {
  key: 'redo',
  icon: 'mdi-undo',
  onClick: function(stage: any, context: any) {
    const data = context.storageData.redo();
    if (data) {
      context.updateState({ data });
    }
  },
};
