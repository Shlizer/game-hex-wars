import React from 'react'
import styles from './style.scss';

export default class Canvas extends React.Component {
    ref = React.createRef<HTMLCanvasElement>()

    componentDidMount() {
        window.requestAnimationFrame(this.checkSize)
    }

    get parent() {
        return this.ref.current
            ? this.ref.current.parentElement
            : null
    }

    checkSize = () => {
        if (this.ref.current && this.parent) {
            if (this.ref.current.width !== this.parent.clientWidth) {
                this.ref.current.width = this.parent.clientWidth-10
            }
            if (this.ref.current.height !== this.parent.clientHeight) {
                this.ref.current.height = this.parent.clientHeight-10
            }
        }
        window.requestAnimationFrame(this.checkSize)
    }

    render() {
        return (
            <canvas className={styles.canvas} ref={this.ref} />
        )
    }
}