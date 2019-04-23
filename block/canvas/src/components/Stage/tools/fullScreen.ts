import screenfull from 'screenfull';

export default {
  key: 'fullScreen',
  icon: 'mdi-cursor-move',
  onClick: function() {
    screenfull.toggle();
  },
};
