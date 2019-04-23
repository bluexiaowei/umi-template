import React from 'react';
import { Transformer } from 'react-konva';

interface TransformerComponentProps {
  selectedId: string;
}
class TransformerComponent extends React.Component<TransformerComponentProps> {
  transformer: React.RefObject<any> = React.createRef();
  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    const transformer = this.transformer.current;
    // here we need to manually attach or detach Transformer node
    const stage = transformer.getStage();
    const { selectedId } = this.props;
    if (!selectedId) {
      transformer.detach();
      transformer.getLayer().batchDraw();
      return;
    }

    const selectedNode = stage.findOne('#' + selectedId);

    if (selectedNode.getClassName() === 'Line') {
      transformer.detach();
      transformer.getLayer().batchDraw();
      return;
    }

    if (selectedNode === transformer.node()) {
      return;
    }

    if (selectedNode) {
      transformer.attachTo(selectedNode);
    } else {
      transformer.detach();
    }
    transformer.getLayer().batchDraw();
  }
  render() {
    return <Transformer ref={this.transformer} borderStroke="red" name="transformer" />;
  }
}

export default TransformerComponent;
