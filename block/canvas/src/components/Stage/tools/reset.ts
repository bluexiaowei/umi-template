import fullView from '../../utils/fullView';
module.exports = {
  key: 'reset',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any, context: any) {
    fullView(stage, context, true);
  },
};
