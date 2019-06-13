import * as React from 'react';
import Stage from './components/Stage/index';

class CanvasPage extends React.Component {
  state = {
    boxList: [],
    imageSRC:
      'http://192.168.198.207:8071/static/processed_test1.2_47dc9d6f14a6341b3535ab9325771960_zss_05.jpg',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        boxList: [
          { id: '1', type: 'Rect', x: 200, y: 200, width: 100, height: 100 },
          {
            id: '2',
            type: 'Polygon',
            points: [210, 210, 300, 210, 300, 300, 210, 300],
            closed: true,
          },
        ],
      });
    }, 1000);
  }

  render() {
    const { boxList, imageSRC } = this.state;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <Stage data={boxList} onChange={this.stageChange} BGImageSRC={imageSRC} />
      </div>
    );
  }

  stageChange = (select: string, data: any[]) => {
    console.log(select, data);
  };
}

export default CanvasPage;
// withTreeData,
// withHistory,
