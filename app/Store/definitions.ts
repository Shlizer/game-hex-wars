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

/**
 * Store configs
 */
export type StoreDirs = {
    asset: string,
    map: string,
    tileset: string
}