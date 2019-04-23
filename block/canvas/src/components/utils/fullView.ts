export default function(stage: any, height?: boolean) {
  const areas: Array<any> = stage.find('.area');
  const [area]: any = areas;
  const BGImage: any = area.findOne('.BGImage');
  let positon: { x: number; y: number } = { x: 0, y: 0 };
  let scale: number;
  if (!BGImage) {
    return;
  }

  if (height) {
    scale = Math.min(
      area.getAttrs().width / BGImage.width(),
      area.getAttrs().height / BGImage.height()
    );
    positon = {
      x: (area.getAttrs().width - BGImage.width() * scale) / 2,
      y: (area.getAttrs().height - BGImage.height() * scale) / 2,
    };
  } else {
    scale = Math.max(
      area.getAttrs().width / BGImage.width(),
      area.getAttrs().height / BGImage.height()
    );
  }

  areas.forEach(area => {
    area.scale({ x: scale, y: scale }).position(positon);
  });
  stage.context.setState({ strokeScale: scale });
  stage.batchDraw();
}
