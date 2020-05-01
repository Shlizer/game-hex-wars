import { Tileset } from '../Tileset/index.js'
export class Hex {
    constructor({ canvas, x, y, width, height, border, tileset, gfx }) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.x = x
        this.y = y
        this.border = border
        this.width = width
        this.height = height
        this.tileData = Tileset.getTile(tileset, gfx)

        const _x = this.border + (this.x * this.width * 0.75)
        const _y = this.border + (this.y * this.height) + (this.x % 2 ? this.height / 2 : 0)

        this.points = [
            [_x + this.width / 4, _y], // top - left
            [_x + this.width * 3 / 4, _y], // top - right
            [_x + this.width - this.border, _y + this.height / 2], // right
            [_x + this.width * 3 / 4, _y + this.height], // bottom - right
            [_x + this.width / 4, _y + this.height], // bottom - left
            [_x + 0, _y + this.height / 2] // left
        ]
    }

    render() {
        if (this.tileData.loaded) {
            console.log('draw at ', this.context)
            // console.log('draw at ', this.x, this.y, this.width, this.height)
            this.context.drawImage(this.tileData.img, this.x * this.width, this.y * this.height, this.width, this.height)
        }
        this.drawCoords()
        return !this.tileData.loaded
    }

    /**
     * @deprecated
     */
    drawHex() {
        this.context.beginPath();
        this.context.lineWidth = this.border;
        this.context.moveTo(this.points[0][0], this.points[0][1]);
        for (let i = 1; i < this.points.length; ++i) {
            this.context.lineTo(this.points[i][0], this.points[i][1]);
        }
        this.context.lineTo(this.points[0][0], this.points[0][1]);

        this.context.strokeStyle = "white";
        this.context.fillStyle = "#333333";
        this.context.stroke();
        this.context.fill();

    }

    drawCoords() {
        this.context.fillStyle = "white";
        this.context.font = "normal 1.2em Lato";
        this.context.fillText(`${this.x}, ${this.y}`, this.points[0][0] + (this.width / 2), this.points[0][1] + (this.height / 2));
    }
}