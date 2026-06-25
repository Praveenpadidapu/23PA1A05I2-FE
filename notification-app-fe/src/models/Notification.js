export class Notification {
  constructor({ id, type, title, message, receivedAt, read }) {
    this.id = id;
    this.type = type; // 'placement', 'result', 'event'
    this.title = title;
    this.message = message;
    this.receivedAt = receivedAt; // timestamp
    this.read = read; // boolean
  }
}
