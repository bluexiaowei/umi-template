import zoom from '../../utils/zoom';

module.exports = {
  key: 'zoomOut',
  onClick(stage: any) {
    const areas = stage.find('.area');
    const oldScal = areas[0].scaleX();
    const newScale = oldScal / 1.07;
    areas.forEach(area => {
      zoom(area, oldScal, newScale);
    });
    stage.batchDraw();
  },
};
