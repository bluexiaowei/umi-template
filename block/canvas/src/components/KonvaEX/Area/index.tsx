import React from 'react';
import { Layer, Group, Image, Line, Text } from 'react-konva';
import TransformerComponent from '../TransformerComponent';
interface AreaPrams {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

interface AreaContentParams {
  params: AreaPrams;
  BGImage: HTMLImageElement | void | false;
  selectedId?: string;
  children?: any;
  transformer?: boolean;
  listening?: boolean;
}
const Area: (areaParams: AreaContentParams) => React.ReactElement = areaParams => {
  const { params, BGImage, children, transformer, selectedId, listening } = areaParams;
  const { x, y, width, height, ...other } = params;
  const clipParams = { x: 0, y: 0, width, height };
  return (
    <Layer x={x} y={y} clip={clipParams} name="areaLayer">
      <Group width={width} height={height} x={0} y={0} {...other} listening={listening}>
        {BGImage ? <Image name="BGImage" image={BGImage} /> : null}
        {BGImage ? children : hitText(params, BGImage === false)}
        {transformer ? <TransformerComponent selectedId={selectedId} /> : null}
      </Group>
      <Line
        closed={true}
        listening={false}
        points={[0, 0, width, 0, width, height, 0, height]}
        stroke="black"
        strokeWidth={1}
        name="areaBorder"
      />
    </Layer>
  );
  function hitText(params: AreaPrams, error: boolean) {
    const TEXT_WIDTH = 100;
    const TEXT_HEIGHT = 30;
    return (
      <Text
        text={error ? '图片加载失败' : '图片加载中...'}
        fill={error ? 'red' : 'black'}
        align="center"
        x={(params.width - TEXT_WIDTH) / 2}
        y={(params.height - TEXT_HEIGHT) / 2}
        fontSize={TEXT_HEIGHT}
        name="loadingText"
      />
    );
  }
};

export default Area;
