import EnginePart from './_part';
import State from '../../State';
import MapManager from '../../Map/manager';
import LayerObject from '../../Map/layer';
import { LayerType } from '../../../../Definitions/layer';
import { Size } from '../../../../Definitions/helper';

export default class Map extends EnginePart {
  current: { scale: number; map: { size: Size } };

  constructor() {
    super();
    this.current = {
      scale: State.viewport.scale,
      map: { size: State.map.size.full }
    };
  }

  renderLayer = (layer: LayerObject) => {
    const layerCtx = layer.render();
    this.context.drawImage(
      layerCtx.canvas,
      layer.data.type !== LayerType.BMP
        ? MapManager.current?.layout?.offset?.left || 0
        : 0,
      layer.data.type !== LayerType.BMP
        ? MapManager.current?.layout?.offset?.top || 0
        : 0
    );
  };

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number) {
    const { w, h } = State.map.size.full;
    this.checkCurrent(this.canvas, 'width', Math.round(w));
    this.checkCurrent(this.canvas, 'height', Math.round(h));

    this.checkCurrent(this.current, 'scale', State.viewport.scale);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    MapManager.current?.layers.forEach(this.renderLayer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    _mainContext.drawImage(
      this.canvas,
      -State.scroll.x,
      -State.scroll.y,
      this.canvas.width,
      this.canvas.height
    );
  }
}
