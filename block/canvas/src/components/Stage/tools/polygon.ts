import Konva from 'konva';
import KonvaEX from '../../KonvaEX';
import offsetPoint from '../../utils/offsetPoint';
import darwPoints from '../../utils/darwPoints';

function beforeFn(stage: any) {
  stage.content.style.cursor = 'crosshair';
}

function afterFn(stage: any) {
  stage.content.style.cursor = 'default';
}

function onMouseDown({ target }) {
  if (!this.operating) {
    this.operating = {};
  }
  const stage: any = target.getStage();
  const layer: any = target.getLayer();
  const areas: any[] = layer.find('.area');
  const scale: number = areas[0].scaleX();
  const stagePointerPos: { x: number; y: number } = stage.getPointerPosition();
  const position: { x: number; y: number } = {
    x: (stagePointerPos.x - layer.x() - areas[0].x()) / scale,
    y: (stagePointerPos.y - layer.y() - areas[0].y()) / scale,
  };
  let closed = false;

  // 判断是否是继续画多边形，还是新建一个多边形。
  if (this.operating.polygons) {
    const { polygons } = this.operating;
    const [polygon] = polygons;

    const points: number[] = polygon.points();

    //判断终端离起点小于 10 px，将线头尾相接。否则，继续画图
    if (
      Math.abs(position.x - points[0]) < 5 ||
      (Math.abs(position.y - points[1]) < 5 && points.length > 4)
    ) {
      points.splice(-2);
      polygons.forEach((polygon: any) => {
        polygon.points(points);
        polygon.closed(true);
        polygon.getLayer().batchDraw();
      });

      // 删除红点点
      stage.find('.point').forEach(point => {
        point.destroy();
      });

      // 跟新数据并添加为历史记录
      const { context } = stage;
      context.setState((state: any) => {
        for (let i: number = 0, len: number = state.data.length; i < len; i++) {
          if (state.data[i].id === polygon.id()) {
            state.data[i] = polygon.getAttrs();
          }
        }
        context.storageData.addHistory(state.data);
        return state;
      });

      this.operating = null;
    } else {
      points.push(position.x, position.y);
      polygons.forEach((polygon: any) => {
        polygon.points(points);
        polygon.getLayer().batchDraw();
      });

      // 追加红点点
      const polygonPoint: any = darwPoints([position.x, position.y])[0];
      areas.forEach((area: any) => {
        polygonPoint.setAttrs({ radius: polygonPoint.getAttr('radius') / scale });
        area.add(polygonPoint);
      });
      stage.batchDraw();
    }
  } else {
    const polygon: any = new Konva.Line(KonvaEX.Polygon.create(position));

    stage.context.setState((stage: any) => {
      stage.data.push(polygon.getAttrs());
      return stage;
    });

    // 给多边形节点上红点点。
    const polygonPoints = darwPoints(polygon.points());
    areas.forEach((area: any) => {
      polygonPoints.forEach((polygonPoint: any, i: number) => {
        polygonPoint.setAttrs({ radius: polygonPoint.getAttr('radius') / scale });
        area.add(polygonPoint.clone());
      });
    });
    stage.batchDraw();

    this.operating = {
      stage,
      areas,
      scale,
      mouseStart: stagePointerPos,
      closed,
      polygons: stage.find(`#${polygon.id()}`),
    };
  }
}

function onMouseMove() {
  if (this.operating && this.operating.polygons) {
    const { stage, scale, polygons, mouseStart, areas } = this.operating; // elementGroup
    const [area] = areas;
    const stagePointerPos = stage.getPointerPosition();
    const [polygon] = polygons;
    const offset = {
      x: (stagePointerPos.x - mouseStart.x) / scale,
      y: (stagePointerPos.y - mouseStart.y) / scale,
    };
    const points = offsetPoint({
      points: polygon.points(),
      index: polygon.points().length / 2 - 1,
      type: polygon.getAttrs().type,
      offset,
    });

    const polygonsPoints = area.find('.point');

    polygonsPoints[polygonsPoints.length - 1].move(offset);

    polygons.forEach((element: any) => {
      element.points(points);
    });

    stage.batchDraw();

    this.operating.mouseStart = stagePointerPos;
  }
}

export default {
  key: 'polygon',
  icon: 'mdi-cursor-move',
  beforeFn,
  afterFn,
  stageProps: { onMouseDown, onMouseMove },
};
