import _ from 'lodash';
// import * as inface from './index.d';
import * as React from 'react';
import RKonva from 'react-konva';
import KonvaEX from '../KonvaEX';
import ToolBar from '../ToolBar/index';

import Area from '../KonvaEX/Area';

import fullView from '../utils/fullView';
import WidthHistory from '../utils/WidthHistory';
import styles from './index.less';

// tool
import move from './tools/move';
import rect from './tools/rect';
import polygon from './tools/polygon';
import zoomIn from './tools/zoomIn';
import zoomOut from './tools/zoomOut';
import view from './tools/view';
import reset from './tools/reset';
import fullScreen from './tools/fullScreen';
import withHeight from './tools/withHeight';
import withWidth from './tools/withWidth';
import undo from './tools/undo';
import redo from './tools/redo';

interface Element {
  id: string;
  type: string;
  points?: Array<number[]>;
}
interface StageExPopos {
  data: Element[];
  onChange?(active: string, data: Element[]): void;
  BGImageSRC?: string | void;
}

interface StageExParams {
  total: number;
  width: number;
  height: number;
  mode: StageExMode;
}
interface StageExState {
  stageOpt: StageExParams;
  stageProps: RKonva.StageProps;
  data: Element[];
  BGImage: HTMLImageElement | undefined | false;
  strokeScale: number;
  selectedId: string;
  toolKey: string;
}

enum ElementConst {
  strokeWidth = 1,
  storkeColor = 'red',
}
enum StageExMode {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

class StageEx extends React.Component<StageExPopos> {
  static displayName: 'StageEx';
  constructor(props: StageExPopos) {
    super(props);
  }

  state: StageExState = {
    stageOpt: {
      total: 2,
      height: 1,
      width: 1,
      mode: StageExMode.vertical,
    },
    stageProps: {},
    data: [],
    BGImage: undefined,
    strokeScale: 1,
    selectedId: '',
    toolKey: '',
  };
  container: React.RefObject<HTMLDivElement> = React.createRef();
  stage: React.RefObject<RKonva.Stage> = React.createRef();
  storageData = new WidthHistory();
  tools: any[] = [
    move,
    rect,
    polygon,
    zoomIn,
    zoomOut,
    view,
    reset,
    fullScreen,
    withHeight,
    withWidth,
    undo,
    redo,
  ];

  componentDidMount() {
    const stage = this.stage.current;
    stage.context = this;
    this.fullContent();
    this.createBGImage(this.props.BGImageSRC);
    window.addEventListener('resize', this.fullContent);
  }

  shouldComponentUpdate(nextProps: any) {
    if (!this.props.data.length && nextProps.data.length) {
      this.storageData.createData(nextProps.data);
    }
    if (this.props.BGImageSRC !== nextProps.BGImageSRC) {
      // this.createBGImage(nextProps.BGImageSRC);
    }
    if (!_.isEqual(this.props.data, nextProps.data)) {
      this.setState({ data: nextProps.data });
    }

    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fullContent);
  }

  render() {
    const { stageOpt, stageProps, BGImage, selectedId, data, toolKey } = this.state;

    return (
      <div ref={this.container} className={styles.container}>
        <ToolBar menus={this.tools} onClick={this.barClick} selectKey={toolKey} />
        <KonvaEX.Stage {...stageOpt} {...stageProps} ref={this.stage} name="stage">
          {/* tslint:disable-next-line:jsx-no-multiline-js */}
          <Area
            params={this.createAreaParams(stageOpt)[0]}
            children={this.renderAreaDef(data)}
            BGImage={BGImage}
            selectedId={selectedId}
            transformer={true}
          />
          <Area
            params={this.createAreaParams(stageOpt)[1]}
            children={this.renderAreaDef(data)}
            BGImage={BGImage}
            selectedId={selectedId}
            listening={false}
          />
        </KonvaEX.Stage>
      </div>
    );
  }

  // 调节画布大小
  fullContent = _.throttle(() => {
    this.setState(
      (state: StageExState): StageExState => {
        const container = this.container.current;
        state.stageOpt.height = container.clientHeight - 50;
        state.stageOpt.width = container.clientWidth;
        return state;
      }
    );
  }, 300);

  // 生成对应的操作区域参数。
  createAreaParams = (params: StageExParams): any => {
    const NAME = 'area';
    const PADDING: number = 1;
    const BORDER_WIDTH: number = ElementConst.strokeWidth;
    const SPACING: number = 2;
    const { width, height, total, mode } = params;

    if (mode === StageExMode.horizontal) {
      const areas = [
        {
          x: PADDING + BORDER_WIDTH,
          y: PADDING + BORDER_WIDTH,
          width: width - (PADDING + BORDER_WIDTH) * 2,
          height: (height - SPACING) / total - (PADDING + BORDER_WIDTH) * 2,
          name: NAME,
        },
      ];

      areas.push({
        x: PADDING + BORDER_WIDTH,
        y: (PADDING + BORDER_WIDTH) * 3 + SPACING + areas[0].height,
        width: width - (PADDING + BORDER_WIDTH) * 2,
        height: (height - SPACING) / 2 - (PADDING + BORDER_WIDTH) * 2,
        name: NAME,
      });

      return areas;
    } else if (mode === StageExMode.vertical) {
      const areas = [
        {
          x: PADDING + BORDER_WIDTH,
          y: PADDING + BORDER_WIDTH,
          width: (width - SPACING) / total - (PADDING + BORDER_WIDTH) * total,
          height: height - (PADDING + BORDER_WIDTH) * 2,
          name: NAME,
        },
      ];

      areas.push({
        x: (PADDING + BORDER_WIDTH) * 3 + SPACING + areas[0].width,
        y: PADDING + BORDER_WIDTH,
        width: (width - SPACING) / 2 - (PADDING + BORDER_WIDTH) * 2,
        height: height - (PADDING + BORDER_WIDTH) * 2,
        name: NAME,
      });

      return areas;
    }
  };

  // 创建一张背景图
  createBGImage = (src: string | void): void => {
    if (!src) {
      return;
    }
    const image = new Image();
    image.src = src;
    image.onload = e => {
      this.setState({ BGImage: image }, () => {
        fullView(this.stage.current, false);
      });
    };
    image.onerror = e => {
      this.setState({ BGImage: false });
    };
  };

  renderAreaDef = (data: any[]) => {
    return data.map(item => {
      const Componet = KonvaEX[item.type];
      return <Componet key={item.id} {...item} />;
    });
  };

  // 点击工具栏
  barClick = (item: any) => {
    const stage = this.stage.current;
    const { toolKey } = this.state;
    // 状态应用前
    if (typeof item.beforeFn === 'function') {
      item.beforeFn(stage, this);
    }

    // 只有点击使事件时
    if (item.onClick) {
      item.onClick(stage, this);
      return;
    }

    // 上一个状态切换后
    if (toolKey && toolKey !== item.key) {
      for (let i: number = 0, len: number = this.tools.length; i < len; i++) {
        const tool: any = this.tools[i];

        if (tool.key === toolKey && typeof tool.afterFn === 'function') {
          tool.afterFn(stage, this);
          break;
        }
      }
    }

    this.setState({
      toolKey: item.key,
      stageProps: item.stageProps,
    });
  };

  // 代理状态更新函数。
  updateState = (state: any, callback?: () => {}) => {
    let tempState: any;
    if (typeof state === 'function') {
      tempState = state(this.state);
    } else {
      tempState = state;
    }

    this.setState(tempState, () => {
      if (typeof this.props.onChange === 'function') {
        const { selectedId, data } = this.state;
        this.props.onChange(selectedId, data);
      }
      if (typeof callback === 'function') {
        callback();
      }
    });
  };
}
export default StageEx;
