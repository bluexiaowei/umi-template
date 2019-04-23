import _ from 'lodash';
import React from 'react';
import Konva from 'konva';
import { Line } from 'react-konva';
import uuid from 'Utils/uuid';

import onDragMove from '../../utils/onDragMove';
import onDragEnd from '../../utils/onDragEnd';

class PolygonEx extends React.PureComponent<Konva.LineConfig> {
  static create: (point: { x: number; y: number }) => { type: string; id: any; points: number[] };
  render() {
    return (
      <Line
        {...this.props}
        stroke="black"
        strokeWidth={1}
        onDragMove={this.onDragMove}
        onDragEnd={onDragEnd}
        strokeScaleEnabled={false}
      />
    );
  }
  onDragMove = (e: any) => {
    const stage: any = e.target.getStage();
    if (stage.context.state.selectedId === e.target.id()) {
      const polygonPoints: any[] = stage.find('.point');
      const points: number[] = e.target.points();

      polygonPoints.forEach((point: any, i: number) => {
        const x = points[i * 2];
        const y = points[i * 2 + 1];
        if (x && y) {
          point.position({ x: x + e.target.x(), y: y + e.target.y() });
        } else {
          point.destroy();
        }
      });
    }
    onDragMove(e);
  };
}

PolygonEx.create = function(point) {
  const polygon = {
    type: 'Polygon',
    id: uuid(),
    points: [point.x, point.y, point.x, point.y],
  };

  return polygon;
};

export default PolygonEx;
