import WithContext from '../../_withContext';

export default class EnginePart extends WithContext {
  shouldUpdate = true;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  update(_time: number): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderWrapper(_mainContext: CanvasRenderingContext2D): void {
    if (this.shouldUpdate) {
      this.renderPrepare();
      this.shouldUpdate = false;
    }
    if (this.canvas.width && this.canvas.height) {
      this.renderOnMain(_mainContext);
    } else {
      console.log('Canvas size is 0');
      this.shouldUpdate = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderPrepare(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  renderOnMain(_mainContext: CanvasRenderingContext2D): void {
    throw new Error('Method not implemented.');
  }
}
