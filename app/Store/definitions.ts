/**
 * External configs
 */
export type AppConfig = {
    debug: Boolean,
    assetDir: string,
    mapDir: string,
    tilesetDir: string
}

export type MapInfoConfig = {
    id: string | undefined,
    name: string,
    description: string,
    author: string
}

export type MapLayoutConfig = {

}

export type MapConfig = {
    info: MapInfoConfig, 
    layout: MapLayoutConfig
}[]

export type TilesetConfig = {
    name: string,
    description: string,
    author: string,
    file: string,
    extension: string,
    gridSize: {
        width: number,
        height: number
    },
    size: {
        width: number,
        height: number
    },
    offset: {
        x: number,
        y: number
    }
}

/**
 * Store configs
 */
export type StoreDirs = {
    asset: string,
    map: string,
    tileset: string
}