import fullView from '../../utils/fullView';
export default {
  key: 'reset',
  icon: 'mdi-cursor-move',
  onClick: function(stage: any, context: any) {
    fullView(stage, true);
  },
};
