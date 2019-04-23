import React from 'react';
import { Image } from 'react-konva';
export default class ImageCom extends React.PureComponent {
  state = {
    image: undefined,
    src: this.props.src,
  };

  componentDidMount() {
    this._createImage(this.props);
  }

  render() {
    const { onload, src, ...other } = this.props;
    const { image } = this.state;
    return <Image image={image} ref={node => (this.imageNode = node)} {...other} />;
  }

  _createImage = ({ src, onload }) => {
    if (src) {
      const image = new window.Image();
      // image.crossOrigin = 'anonymous';
      image.src = src;
      image.onload = () => {
        this.setState({ src, image }, () => {
          this.imageNode.getLayer().batchDraw();
          typeof onload === 'function' && onload(this.imageNode);
        });
      };
    }
  };
}
