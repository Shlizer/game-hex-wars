# Hex Wars - Documentation

:arrow_backward: [Back](index.md)

This application is based on several configuration files. Elements that are for now not implemented will be shown _this way_

## App config

For now config file of application is basic, but in future there will be more configurable values like window resolution, opening in full-screen, shortcuts and so on.

| Value     | Type    | Description                                                                                                                         |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| debug     | boolean | Shows or hides debug window                                                                                                         |
| dir       | object  | Stores paths to game resources. Each dir can use wildcards such as:<br />**%MAIN_PATH** - game dir<br />**%ASSET_DIR%** - asset dir |
| - asset   | string  | Path to assets (basically main dir for other)                                                                                       |
| - map     | string  | Path to all stored maps                                                                                                             |
| - tileset | string  | Path to stored tilesets                                                                                                             |

## Map config

Map configuration is stored in two separate files: **info.json** has some basic informations for listing purposes and **layout.json** that stores all draw and logic information of the map

**info.json**

| Value       | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| name        | string    | name of the map                                               |
| description | ?string   | description of the map                                        |
| _tags_      | ?string[] | tags that can be useful in future map searching and filtering |
| author      | ?string   | author(s) of the map                                          |
| _url_       | ?string   | url to homepage of map or its creators                        |
| _screen_    | ?string   | path to screen of the map (to show in the list)               |

**layout.json**

| Value      | Type                      | Default | Description                                                                                            |
| ---------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| hex        | object                    |         | stores information of the size of hexes                                                                |
| - width    | number                    |         | hex width (logic to draw) in pixels                                                                    |
| - height   | number                    |         | hex height (logic to draw) in pixels                                                                   |
| _minimap_  | ?string                   |         | path to minimap graphic if exists                                                                      |
| layers     | object[]                  |         | this object stores map layers and comes with few layer types                                           |
| - type     | enum[BMP, TILE, *PATH*]   | TILE    | informs what layer type it is                                                                          |
| ---        | ---                       | ---     | OPTIONS ONLY FOR **type: 'BMP'** (bitmap layer)                                                        |
| size       | [number, number]          |         | size of the bitmap to draw                                                                             |
| offset     | ?[number, number]         | [0,0]   | offset of bitmap to draw                                                                               |
| file       | string                    |         | path to bitmap file                                                                                    |
| alpha      | number(0-255)             | 255     | sets alpha channel for layout                                                                          |
| alphaColor | ?[number, number, number] |         | RGB channels for alpha (opacity) color                                                                 |
| ---        | ---                       | ---     | OPTIONS ONLY FOR **type: 'TILE'** (tile layer)                                                         |
| tileset    | string                    |         | dir name of the tileset layer is using                                                                 |
| tiles      | number\[]\[]              |         | two dimensional array of tile names (its id's); by default it's their position in tileset or file name |
| alpha      | number(0-255)             | 255     | sets alpha channel for layout                                                                          |

## Tileset config

There is multiple ways to create tileset. Creator can make single file with many tiles in it (like in 2d tile-based game classics or RPG Maker and similar tools) or each tile can be separate file. By default tileset stores in multiple files has file names made from number of tile and has .png extension (eg. 3.png, 19.png).

| Value         | Type                      | Default                                | Description                                                                                                                                                                 |
| ------------- | ------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _name_        | ?string                   |                                        | name of the tileset                                                                                                                                                         |
| _description_ | ?string                   |                                        | description of the tileset                                                                                                                                                  |
| _author_      | ?string                   |                                        | author(s) of the tileset                                                                                                                                                    |
| grouped       | ?boolean                  | true                                   | specifies if tileset elements are stored in one single file (**T**) or in multiple ones (**F**)                                                                             |
| offset        | ?object                   | {top: 0, left: 0, right: 0, bottom: 0} | object that specifies how much offset is added to the tile graphics (for eg. for elements that are drawn outside of the hex logic like grass etc.). Values are in pixels.   |
| alphaColor    | ?[number, number, number] |                                        | RGB channels for alpha (opacity) color for whole tileset                                                                                                                    |
| ---           | ---                       | ---                                    | OPTIONS ONLY FOR **grouped: true**                                                                                                                                          |
| file          | ?string                   | tileset.png                            | Name of the file where tileset is stored                                                                                                                                    |
| ---           | ---                       | ---                                    | OPTIONS ONLY FOR **grouped: false**                                                                                                                                         |
| id            | number                    | [autoincrement]                        | id of the tile (for map to create layer of tiles)                                                                                                                           |
| extension     | ?string                   | png                                    | Extension of the separate files                                                                                                                                             |
| tiles         | ?object[]                 |                                        | There can be stored custom data for tiles. It stops automate search for tile files, so it's important to specify here all tiles for tileset                                 |
| - file        | string                    |                                        | path to file of tile                                                                                                                                                        |
| - name        | ?string                   |                                        | name of the tile (shown in tile info in game)                                                                                                                               |
| - description | ?string                   |                                        | description of tile (shown in tile info in game)                                                                                                                            |
| - offset      | ?object                   | {top: 0, left: 0, right: 0, bottom: 0} | offset data like the one above; it **overrides** basic information, so it's possible to set some global (in tileset scope) offset and then modify it only for some of tiles |
| - alphaColor  | ?[number, number, number] |                                        | RGB channels for alpha (opacity) color for single tile                                                                                                                      |
