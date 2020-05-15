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
| _tags_      | ?string[] | list of map tags                                              |
| _url_       | ?string   | url to homepage of map or its creators                        |
| _screen_    | ?string   | path to screen of the map (to show in the list)               |

**layout.json**

| Value     | Type              | Default | Description                                                                                            |
| --------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| _minimap_ | ?string           |         | path to minimap graphic if exists                                                                      |
| layers    | object[]          |         | this object stores map layers and comes with few layer types                                           |
| alpha     | number(0.0-1.0)   | 1.0     | sets alpha channel for layout                                                                          |
| offset    | ?[number, number] | [0,0]   | offset of bitmap to draw                                                                               |
| path      | ?number\[][]      |         | costs for each tile to travel, where 1 means 'normal' and 0 'unreachable'                              |
| - type    | enum[BMP, TILE]   | TILE    | informs what layer type it is                                                                          |
| ---       | ---               | ---     | OPTIONS ONLY FOR **type: 'BMP'** (bitmap layer)                                                        |
| size      | [number, number]  |         | size of the bitmap to draw                                                                             |
| file      | string            |         | path to bitmap file                                                                                    |
| ---       | ---               | ---     | OPTIONS ONLY FOR **type: 'TILE'** (tile layer)                                                         |
| tileset   | string            |         | dir name of the tileset layer is using                                                                 |
| tiles     | number\[]\[]      |         | two dimensional array of tile names (its id's); by default it's their position in tileset or file name |

## Tileset config

There is multiple ways to create tileset. Creator can make single file with many tiles in it (like in 2d tile-based game classics or RPG Maker and similar tools) or each tile can be separate file. By default tileset stores in multiple files has file names made from number of tile and has .png extension (eg. 3.png, 19.png).

| Value         | Type               | Default                                | Description                                                                                                                                                                                                                                            |
| ------------- | ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _name_        | ?string            |                                        | name of the tileset                                                                                                                                                                                                                                    |
| _description_ | ?string            |                                        | description of the tileset                                                                                                                                                                                                                             |
| _author_      | ?string            |                                        | author(s) of the tileset                                                                                                                                                                                                                               |
| grouped       | ?boolean           | true                                   | specifies if tileset elements are stored in one single file (**T**) or in multiple ones (**F**)                                                                                                                                                        |
| hex           | object             |                                        | size of the single hex                                                                                                                                                                                                                                 |
| - width       | number             |                                        | width of hex                                                                                                                                                                                                                                           |
| - height      | number             |                                        | height of hex                                                                                                                                                                                                                                          |
| offset        | ?object            | {top: 0, left: 0, right: 0, bottom: 0} | object that specifies how much offset is added to the tile graphics (for eg. for elements that are drawn outside of the hex logic like grass etc.). Values are in pixels.                                                                              |
| ---           | ---                | ---                                    | OPTIONS ONLY FOR **grouped: true**                                                                                                                                                                                                                     |
| file          | ?string            | tileset.png                            | Name of the file where tileset is stored                                                                                                                                                                                                               |
| ---           | ---                | ---                                    | OPTIONS ONLY FOR **grouped: false**                                                                                                                                                                                                                    |
| id            | number             | [autoincrement]                        | id of the tile (for map to create layer of tiles)                                                                                                                                                                                                      |
| extension     | ?string            | png                                    | Extension of the separate files                                                                                                                                                                                                                        |
| tiles         | ?Tile[key: string] |                                        | There can be stored custom data for tiles. It stops automate search for tile files, so it's important to specify here all tiles for tileset.<br />It's an an object where key is the id of tile (in map config) and value is object Tile (watch below) |

## Tile Config

| Value       | Type    | Default                                | Description                                                                                                                                                                 |
| ----------- | ------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| file        | string  |                                        | path to file of tile                                                                                                                                                        |
| name        | ?string |                                        | name of the tile (shown in tile info in game)                                                                                                                               |
| description | ?string |                                        | description of tile (shown in tile info in game)                                                                                                                            |
| hex         | ?object |                                        | size of the current tile                                                                                                                                                    |
| - width     | ?number |                                        | width of current tile                                                                                                                                                       |
| - height    | ?number |                                        | height of current tile                                                                                                                                                      |
| offset      | ?object | {top: 0, left: 0, right: 0, bottom: 0} | offset data like the one above; it **overrides** basic information, so it's possible to set some global (in tileset scope) offset and then modify it only for some of tiles |
