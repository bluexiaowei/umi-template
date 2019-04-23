export default function(target, style = 'default') {
  target.getStage().container().style.cursor = style;
}
