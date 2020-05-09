export default class Tileset {
    tiles: HTMLCanvasElement[] = []
    
    load({info, tiles}: {info: string, tiles: ImageData[]}) {
        info; tiles
    }

    getTile(name: string) {
        name;
    }
}