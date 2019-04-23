import zoom from '../../utils/zoom';

export default {
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
