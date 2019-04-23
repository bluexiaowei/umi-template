import _ from 'lodash';
import React from 'react';
import Konva from 'konva';
import { Rect } from 'react-konva';
import uuid from 'Utils/uuid';

import onDragMove from '../../utils/onDragMove';
import onDragEnd from '../../utils/onDragEnd';

interface Props {
  id: string;
  type: string;
  points: number[][];
  name?: string;
}

class RectEX extends React.PureComponent<Konva.RectConfig, Props> {
  static create: (point: {
    x: number;
    y: number;
  }) => { type: string; id: any; x: number; y: number; width: number; height: number };

  render() {
    return (
      <Rect
        {...this.props}
        stroke="black"
        strokeWidth={1}
        strokeScaleEnabled={false}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onTransform={this.onTransform}
        onTransformEnd={this.onTransformEnd}
      />
    );
  }

  onTransform = ({ currentTarget }) => {
    const stage = currentTarget.getStage();
    const targets: any[] = stage.find(`#${currentTarget.id()}`);
    targets.forEach(target => {
      target.setAttrs({
        width: currentTarget.width() * currentTarget.scaleX(),
        height: currentTarget.height() * currentTarget.scaleY(),
        scaleX: 1,
        scaleY: 1,
      });
    });
    stage.batchDraw();
  };

  onTransformEnd = ({ currentTarget }) => {
    const stage = currentTarget.getStage();
    const { state, storageData } = stage.context;
    const { data } = state;
    for (let i: number = 0, len: number = data.length; i < len; i++) {
      if (currentTarget.id() === data[i].id) {
        data[i] = currentTarget.getAttrs();
      }
    }
    stage.context.updateState({ data });
    storageData.addHistory(data);
  };
}

RectEX.create = function(point) {
  const rectParams = {
    type: 'Rect',
    id: uuid(),
    x: point.x,
    y: point.y,
    width: 1,
    height: 1,
  };
  return rectParams;
};

export default RectEX;
