import React from 'react';
import { Line, Group, Rect, Layer, Transformer } from 'react-konva';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { position, scale } = props.stageOpt;
    this.state = {
      scale,
      position,
      ...this._boundaryRevision(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { position, scale } = nextProps.stageOpt;
    const state = this.state;
    if (
      position.x !== state.position.x ||
      position.y !== state.position.y ||
      scale.x !== state.scale.x
    ) {
      this.setState({ position, scale, ...this._boundaryRevision(nextProps) });
    }
  }
  componentDidMount() {
    this.transformer.attachTo(this.transformer.getStage().findOne('.clipBox'));
  }
  componentWillUnmount() {
    this.transformer.detach();
  }
  render() {
    const { rectX, rectY, rectWidth, rectHeight } = this.state;
    return (
      <Layer>
        <Group>
          <Rect
            draggable
            scale={{ x: 1, y: 1 }}
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            // stroke="red"
            name="clipBox"
            onTransform={this._changeOpt}
            onDragMove={this._changeOpt}
            onDblclick={this._save}
          />
          <Line
            points={this._getPoints(this.state)}
            fill="rgba(0, 0, 0, 0.7)"
            stroke="rgba(0, 0, 0, 0)"
            closed
          />
          <Transformer ref={node => (this.transformer = node)} rotateEnabled={false} />
        </Group>
      </Layer>
    );
  }

  _getPoints = opt => {
    //
    //    x0    x1        x2      x3
    // y0 +----------------------->+
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    //    |\\\\\\\\\\\\\\\\\\\\\\\\|
    // y1 +------+<--------+-------+
    //    |\\\\\\|         ^\\\\\\\|
    //    |\\\\\\|    0    |\\\\\\\|
    //    |\\\\\\v         |\\\\\\\|
    // y2 +------+-------->+-------+
    //    |\\\\\\\\\\\\\\\\|\\\\\\\|
    //    |\\\\\\\\\\\\\\\\v\\\\\\\v
    // y3 +<---------------+<------+
    //
    const { startX, startY, rectX, rectY, rectWidth, rectHeight, innerWidth, innerHeight } = opt;
    const x = [startX, rectX, rectX + rectWidth, innerWidth];
    const y = [startY, rectY, rectY + rectHeight, innerHeight];
    return [
      x[0],
      y[0],
      x[3],
      y[0],
      x[3],
      y[3],
      x[2],
      y[3],
      x[2],
      y[1],
      x[1],
      y[1],
      x[1],
      y[2],
      x[2],
      y[2],
      x[2],
      y[3],
      x[0],
      y[3],
    ];
  };

  _changeOpt = e => {
    const shape = e.target;
    const { position, scale } = this.props.stageOpt;
    const [rectX, rectWidth] = [shape.x(), shape.width() * shape.scaleX()];
    const [rectY, rectHeight] = [shape.y(), shape.height() * shape.scaleY()];
    this.setState({ rectX, rectY, rectWidth, rectHeight });
  };

  _save = e => {
    const stage = e.target.getStage();
    const { rectX, rectY, rectWidth, rectHeight, position, scale } = this.state;
    this.transformer.detach();
    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    stage.batchDraw();
    // stage.dr
    const data = stage.toDataURL({
      x: rectX,
      y: rectY,
      width: rectWidth,
      height: rectHeight,
      quality: 1,
    });
    stage.scale(scale);
    stage.position(position);
    stage.batchDraw();
    this.transformer.attachTo(this.transformer.getStage().findOne('.clipBox'));
    const { callback } = this.props;
    typeof callback === 'function' && callback(data);
  };
  // 修正边界值 需要将 x y width height 等度量单位缩放成画布真实值
  _boundaryRevision = opt => {
    const { stageOpt } = opt;
    const width = stageOpt.width * 0.7;
    const height = stageOpt.height * 0.7;
    const x = (stageOpt.width - width) / 2;
    const y = (stageOpt.height - height) / 2;
    const [startX, rectX] = [0, x].map(item => (item - stageOpt.position.x) / stageOpt.scale.x);
    const [startY, rectY] = [0, y].map(item => (item - stageOpt.position.y) / stageOpt.scale.y);
    const [innerWidth, rectWidth] = [stageOpt.width, width].map(item => item / stageOpt.scale.x);
    const [innerHeight, rectHeight] = [stageOpt.height, height].map(
      item => item / stageOpt.scale.x,
    );
    return { startX, startY, rectX, rectY, rectWidth, rectHeight, innerWidth, innerHeight };
  };
}
