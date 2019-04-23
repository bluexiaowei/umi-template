import KonvaEx from 'components/KonvaEx';
import zoom from 'utils/zoom';
import darwPoints from 'utils/darwPoints';
import offsetPoint from 'utils/offsetPoint';

const defaultOpe = {
  key: 'move',
  icon: 'mdi-cursor-move',
  beforeFn,
  afterFn,
  stageProps: {
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onDblClick,
  },
};

function beforeFn(stage: any) {
  const areas: any[] = stage.find('.area');
  const excludes: string[] = ['BGImage'];
  areas.forEach(area => {
    area.children.forEach((children: any) => {
      if (!excludes.includes(children.name())) {
        children.draggable(true);
      }
    });
  });
  stage.content.style.cursor = 'default';
}

function afterFn(stage: any) {
  const areas: any[] = stage.find('.area');
  const excludes: string[] = ['BGImage'];
  areas.forEach(area => {
    area.children.forEach((children: any) => {
      if (!excludes.includes(children.name())) {
        children.draggable(false);
      }
    });
  });
  // 切换时先删除所有小红点
  stage.find('.point').forEach((point: any) => {
    point.destroy();
  });
  stage.context.setState({ selectedId: '' });
  stage.content.style.cursor = 'default';
}

// 滚轮缩放
function onWheel(event: any) {
  const { evt, currentTarget } = event;
  evt.stopPropagation();
  evt.preventDefault();
  const stage = currentTarget;
  const areas = stage.find('.area');
  const [area] = areas;
  const scaleBy = 1.07;
  const oldScale = area.scaleX();
  const newScale = evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  areas.forEach(area => {
    zoom(area, oldScale, newScale);
    area.getLayer().batchDraw();
  });
}

function onMouseDown({ target }) {
  if (!this.operating) {
    this.operating = {};
  }
  const stage = target.getStage();
  this.operating = {
    stage,
    key: target.name(),
    target,
    mouseStart:
      target.id() || (target.parent && target.parent.name() === 'transformer')
        ? null
        : stage.getPointerPosition(),
  };
}
function onMouseMove({ target }) {
  // 如果是变形器不做鼠标样式的改变。
  if (target.parent && target.parent.getClassName() === 'Transformer') {
  } else {
    // 内置辅助元素是没有 id 的。
    if (target.id()) {
      target.getStage().content.style.cursor = 'move';
    } else {
      target.getStage().content.style.cursor = 'default';
    }
  }
  if (this.operating && this.operating.mouseStart) {
    // 移动点改变矩形节点位置
    const { stage, mouseStart, key, target } = this.operating;
    const stagePointerPos = stage.getPointerPosition();
    const areas = stage.find('.area');
    const offset = {
      x: stagePointerPos.x - mouseStart.x,
      y: stagePointerPos.y - mouseStart.y,
    };

    // 没有有效移动将不做操作
    if (offset.x === 0 && offset.y === 0) {
      return;
    }

    if (key === 'point') {
      const elements: any[] = stage.find(`#${stage.context.state.selectedId}`);
      elements.forEach((element: any) => {
        element.points(
          offsetPoint({
            points: element.points(),
            index: target.getAttrs().index,
            offset,
            type: 'Polygon',
          })
        );
      });
      target.move(offset);
    } else {
      areas.forEach((area: any) => {
        area.move(offset);
      });
    }
    stage.batchDraw();
    this.operating.mouseStart = stagePointerPos;
  }
}
function onMouseUp() {
  this.operating = null;
}
function onDblClick({ target }) {
  const stage = target.getStage();
  const scale = stage.findOne('.area').scaleX();
  stage.context.setState({ selectedId: target.id() });

  // 切换时先删除所有小红点
  stage.find('.point').forEach((point: any) => {
    point.destroy();
  });

  if (target.getClassName() === 'Line') {
    // 为线或者多边形创建小红点
    const points: any[] = darwPoints(target.points());
    const parent = target.getParent();

    points.forEach(point => {
      point.move(target.position());
      // console.log(point.getAttr('radius'));
      point.setAttrs({ radius: point.getAttr('radius') / scale });
      parent.add(point);
    });
    target.getLayer().batchDraw();
  }
}

module.exports = defaultOpe;
