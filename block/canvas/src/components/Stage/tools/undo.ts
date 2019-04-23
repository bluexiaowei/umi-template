module.exports = {
  key: 'undo',
  icon: 'mdi-undo',
  onClick: function(stage: any, context: any) {
    const data = context.storageData.undo();
    if (data) {
      context.updateState({ data });
      stage.batchDraw();
    }
  },
};
