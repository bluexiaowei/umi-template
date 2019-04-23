export default function onDragEnd({ target }) {
  const stage = target.getStage();
  const { state, storageData } = stage.context;
  const { data } = state;
  for (let i: number = 0, len: number = data.length; i < len; i++) {
    if (target.id() === data[i].id) {
      data[i] = target.getAttrs();
    }
  }
  stage.context.updateState({ data });
  storageData.addHistory(data);
}
