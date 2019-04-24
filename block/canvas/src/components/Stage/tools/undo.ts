export default {
  key: 'undo',
  icon: 'mdi-undo',
  onClick: function(stage: any, context: any) {
    // 切换时先删除所有小红点
    stage.find('.point').forEach((point: any) => {
      point.destroy();
    });
    const data = context.storageData.undo();
    if (data) {
      context.updateState({ data });
      stage.batchDraw();
    }
  },
};
