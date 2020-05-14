/* eslint-disable react/static-property-placement */

export default interface LoopControler {
  update(_time: number): void;
  render(_mainContext?: CanvasRenderingContext2D): CanvasRenderingContext2D;
}
