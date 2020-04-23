export class CanvasManager {
    constructor(engine) {
        this.engine = engine
    }

    render(time) {
        this.checkSize()
        this.clear(time)
    }

    checkSize() {
        // look up the size the canvas is being displayed
        const width = this.engine.container.clientWidth;
        const height = this.engine.container.clientHeight;

        // If it's resolution does not match change it
        if (this.engine.canvas.width !== width || this.engine.canvas.height !== height) {
            console.log('resize canvas to: ', width, height)
            this.engine.canvas.width = width;
            this.engine.canvas.height = height;
            return true;
        }

        return false;
    }

    clear(time) {
        this.engine.context.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);
        time *= 0.001;
        this.engine.context.fillStyle = "#DDE";
        this.engine.context.fillRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);
        this.engine.context.save();

        const spacing = 64;
        const size = 48;
        const across = this.engine.canvas.width / spacing + 1;
        const down = this.engine.canvas.height / spacing + 1;
        const s = Math.sin(time);
        const c = Math.cos(time);
        this.engine.context.strokeStyle = "black";
        this.engine.context.lineWidth = 1;
        const drawIt = () => {
            for (let y = 0; y < down; ++y) {
                for (let x = 0; x < across; ++x) {
                    this.engine.context.setTransform(c, -s, s, c, x * spacing, y * spacing);
                    this.engine.context.strokeRect(-size / 2, -size / 2, size, size);
                }
            }
        }
        drawIt()
        // performance test
        // for (let i = 0; i < 90; ++i) {
        //     drawIt()
        // }

        this.engine.context.restore();

    }
}