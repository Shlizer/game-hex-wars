# Hex Wars

## Table of contents

1. Description
1. Game mechanics
    1. Draw layers
    1. Map layout
    1. Tiles
1. Possible ways for updates
1. ToDo
1. Author, contribute and license

## 1. Description

It's my test project on making JS desktop game using Electron for app features and Canvas for rendering. It'll be basicly simple hex-based strategy game ;)

## 2. Game mechanics

To begin so, there are few tech stuff to cover like: how to draw, layers of map (for better rerender possibilities) and game logic.

I choosed canvas rendering for its superior performance over DOM and SVG methods - both will be kinda slow on bigger maps, where will be hundreds of elements to draw. Canvas seems to be much faster for this kind of rendering but I'll still use DOM elements for UI I belive.

### 2.1 Draw layers

For perfomance reasons I'm going to use multiple layers for draw. Those will be (from top to bottom on Z axis):
- UI (this one accually won't be canvas but regular DOM elements, containing panels for map, units, debug etc.)
- Effects (there can be some special effects like cloud shadows, rain and so on)
- Map (whole map canvas element that will have layers on its own):
    - objects (there can be objects that are bigger than one tile)
    - units (layer for drawing units and buildings)
    - terrain (layer for terrain - in final version there can be multiple of them)
- Background (I consider it also a DOM element)

## 3. Possible ways for updates

For future I plan to.. well.. let's just do basic game prototype ;p

## 4. ToDo

[ ] Tile object\
[ ] Layout Object\
[ ] Map Object\
[ ] Electron overlay\
[ ] Hot load

## 4. Author, contribute and license

**Author:** Krzysiek 'Shlizer' Hinc\
**Contribution:** none for now\
**License:** to be considered