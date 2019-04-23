import fullView from '../../utils/fullView';
module.exports = {
  key: 'withWidth',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any) {
    fullView(stage, false);
  },
};
