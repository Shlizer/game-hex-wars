export class Input {
    constructor() {
        this.offset = { x: 0, y: 0 }
        this.mouse = { x: 0, y: 0 }
        document.addEventListener('mousemove', this.updateMouse)
    }

    update(time, paused) {

    }

    render(time, paused) { }

    updateMouse = e => {
        this.mouse.x = e.clientX - this.offset.x
        this.mouse.y = e.clientY - this.offset.y
    }
}