// import Konval from 'konva';
// import Konva from 'konva';

export default function zoom(area: any, oldScale: number, newScale: number) {
  const areaAttrs = area.getAttrs();
  const areaPosition = area.position();
  const BGImg = area.findOne('.BGImage');
  const position = {
    x: areaAttrs.width / 2 - ((areaAttrs.width / 2 - areaAttrs.x) / oldScale) * newScale,
    y: areaAttrs.height / 2 - ((areaAttrs.height / 2 - areaAttrs.y) / oldScale) * newScale,
  };
  if (BGImg) {
    if (BGImg.width() * newScale <= areaAttrs.width) {
      position.x = (areaAttrs.width - BGImg.width() * newScale) / 2;
      const offsetX = position.x - areaPosition.x;
      if (Math.abs(offsetX) > BGImg.width() / 100) {
        position.x = areaPosition.x + offsetX / 2;
      }
    }
    if (BGImg.height() * newScale <= areaAttrs.height) {
      position.y = (areaAttrs.height - BGImg.height() * newScale) / 2;
      const positionY = position.y - areaPosition.y;
      if (Math.abs(positionY) > BGImg.height() / 100) {
        position.y = areaPosition.y + positionY / 2;
      }
    }
  }

  area.scale({ x: newScale, y: newScale }).position(position);
}
