export class Debugger {
    times = []
    fps = 0
    size = [160, 90]


    constructor(engine) {
        this.engine = engine
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.size[0]
        this.canvas.height = this.size[1]
    }

    render(time) {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.showFPS();
    }

    showFPS() {
        const ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.size[0], this.size[1]);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, this.size[0], this.size[1])
        ctx.fillStyle = "white";
        ctx.font = "normal 1.5em Lato";
        ctx.fillText(`FPS: ${this.fps.toFixed(2)}`, 10, 26);
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = 1;
        // ctx.strokeText(this.fps.toFixed(2) + " fps", 10, 26);
        ctx.lineWidth = 1;

        this.engine.context.drawImage(this.canvas, 0, 0, this.size[0], this.size[1]);
    }
}