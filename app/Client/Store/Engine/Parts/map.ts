import EnginePart from './_part';
import State from '../state';
import MapManager from '../../Map/manager';
import LayerObject from '../../Map/layer';
import { LayerType } from '../../../../Definitions/layer';
import { clearContext } from '../helpers';

export default class Map extends EnginePart {
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
    if (
      this.canvas.width !== State.map.size.full.w ||
      this.canvas.height !== State.map.size.full.h
    ) {
      this.canvas.width = State.map.size.full.w;
      this.canvas.height = State.map.size.full.h;
      this.shouldUpdate = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    clearContext(this.context);
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
