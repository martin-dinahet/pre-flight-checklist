export class Checklist {
  constructor({ id, title, items }) {
    this.id = id;
    this.title = title;
    this.items = items;
  }
}

export class Item {
  constructor({ id, text, checked }) {
    this.id = id;
    this.text = text;
    this.checked = checked;
  }
}
