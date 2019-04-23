import Konva from 'konva';
import KonvaEX from '../../KonvaEX';

function beforeFn(stage: any) {
  stage.content.style.cursor = 'crosshair';
}

function afterFn(stage: any) {
  stage.content.style.cursor = 'default';
}

function onMouseDown({ target }) {
  const stage = target.getStage();
  const layer = target.getLayer();
  const areas: any[] = stage.find('.area');
  const [area] = areas;
  const stagePointerPos = stage.getPointerPosition();
  const scale = area.scaleX();
  const point = {
    x: (stagePointerPos.x - layer.x() - area.x()) / scale,
    y: (stagePointerPos.y - layer.y() - area.y()) / scale,
  };
  const rectangle: any = new Konva.Rect(KonvaEX.Rect.create(point));

  this.operating = {
    stage,
    scale,
    mouseStart: stagePointerPos,
    id: rectangle.id(),
  };

  stage.context.setState(state => {
    state.data.push(rectangle.getAttrs());
    return state;
  });
  stage.content.style.cursor = 'nwse-resize';
}

function onMouseMove({ target }) {
  if (!this.operating || !this.operating.id) {
    return;
  }
  const { stage, scale, mouseStart, id } = this.operating;
  const targets = stage.find(`#${id}`);
  const stagePosition = stage.getPointerPosition();
  const offset = {
    x: (stagePosition.x - mouseStart.x) / scale,
    y: (stagePosition.y - mouseStart.y) / scale,
  };

  this.operating.mouseStart = stagePosition;

  targets.forEach(item => {
    const attrs = item.getAttrs();
    item.setAttrs({
      width: attrs.width + offset.x,
      height: attrs.height + offset.y,
    });
    item.getLayer().batchDraw();
  });
}

function onMouseUp(e) {
  const { stage, id } = this.operating;
  const { context } = stage;
  const target = stage.findOne(`#${id}`);
  const targetAttrs = target.getAttrs();
  const { data } = context.state;

  data.some((item: any, i: number, array: any[]) => {
    if (item.id === targetAttrs.id) {
      if (Math.abs(targetAttrs.height) < 10 || Math.abs(targetAttrs.width) < 10) {
        array.splice(i, 1);
      } else {
        array[i] = targetAttrs;
      }
      return true;
    }
  });

  context.setState({ data });
  context.storageData.addHistory(data);
  this.operating = null;

  stage.content.style.cursor = 'crosshair';
}

export default {
  key: 'rect',
  icon: 'mdi-cursor-move',
  beforeFn,
  afterFn,
  stageProps: { onMouseDown, onMouseMove, onMouseUp },
};
