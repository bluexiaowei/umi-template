import * as React from 'react';
import Stage from './components/Stage/index';
import styles from './index.less';

class CanvasPage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    boxList: [],
    imageSRC:
      'http://shuruitech.net:16874/static/processed_SH_2_a7b93b6a06735bb7cfdae6d2c176e1d2_420190222142311M2913513010019.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTU3NDAxMDAsInVzZXJfaWQiOjIsImV4cCI6MTU1NTc4MzMwMH0.iOcivl1uSAopG8P51tWCXdT8mHzYINYF9WauzKkueUw',
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
