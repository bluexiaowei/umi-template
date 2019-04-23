import React from 'react';
import { Transformer } from 'react-konva';
export default class TransformerComponent extends React.Component {
  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    const { selectedShapeName } = this.props;
    const stage = this.transformer.getStage();
    const selectedNode = stage.findOne('.' + selectedShapeName);
    // do nothing if selected node is already attached
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      // attach to another node
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return <Transformer ref={node => (this.transformer = node)} />;
  }
}
