import fullView from '../../utils/fullView';
module.exports = {
  key: 'withHeight',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any) {
    fullView(stage, true);
  },
};
