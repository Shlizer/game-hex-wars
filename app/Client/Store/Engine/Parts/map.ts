import EnginePart from './_part';
import State from '../../State';
import MapManager from '../../Map/manager';
import LayerObject from '../../Map/layer';
import { LayerType } from '../../../../Definitions/layer';
import { Size } from '../../../../Definitions/helper';

export default class Map extends EnginePart {
  current: { scale: number; map: { size: Size }; grid: { border: number } };

  constructor() {
    super();
    this.current = {
      scale: State.viewport.scale,
      map: { size: State.map.size.full },
      grid: { border: State.grid.border }
    };
  }

  renderLayer = (layer: LayerObject) => {
    const layerCtx = layer.render();
    const { type } = layer.data;
    const { current } = MapManager;

    this.context.drawImage(
      layerCtx.canvas,
      type !== LayerType.BMP ? current?.layout?.offset?.left || 0 : 0,
      type !== LayerType.BMP ? current?.layout?.offset?.top || 0 : 0
    );
  };

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number) {
    const w = State.map.size.full.w + State.grid.border;
    const h = State.map.size.full.h + State.grid.border;
    this.checkCurrent(this.canvas, 'width', Math.round(w));
    this.checkCurrent(this.canvas, 'height', Math.round(h));

    this.checkCurrent(this.current, 'scale', State.viewport.scale);
    this.checkCurrent(this.current.grid, 'border', State.grid.border);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    MapManager.current?.layers.forEach(this.renderLayer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    _mainContext.drawImage(
      this.canvas,
      -State.scroll.x + this.current.grid.border / 2,
      -State.scroll.y + this.current.grid.border / 2,
      this.canvas.width,
      this.canvas.height
    );
  }
}
