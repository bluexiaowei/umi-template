export default function onDragMove({ target }) {
  const stage = target.getStage();
  const targets: any[] = stage.find(`#${target.id()}`);
  targets.forEach(ele => {
    ele.position(target.position());
  });
  stage.batchDraw();
}
