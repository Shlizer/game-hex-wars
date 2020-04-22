# Hex Wars

## Table of contents

1. Description
1. Game mechanics
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