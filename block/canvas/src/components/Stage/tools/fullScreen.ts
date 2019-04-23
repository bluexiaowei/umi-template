import screenfull from 'screenfull';

module.exports = {
  key: 'fullScreen',
  icon: 'mdi-cursor-move',
  onClick: function() {
    screenfull.toggle();
  },
};
