import fullView from '../../utils/fullView';
export default {
  key: 'withHeight',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any) {
    fullView(stage, true);
  },
};
