import { TypeInfo } from '../../../Definitions/map';

export default class MapObject {
  selected = false;

  info: TypeInfo;

  constructor(info: TypeInfo) {
    this.info = info;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}
