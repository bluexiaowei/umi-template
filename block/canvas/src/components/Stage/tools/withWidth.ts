import fullView from '../../utils/fullView';
export default {
  key: 'withWidth',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any) {
    fullView(stage, false);
  },
};
