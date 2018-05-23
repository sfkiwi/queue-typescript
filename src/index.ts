import { LinkedList } from 'linked-list-typescript';

export class Queue<T> extends LinkedList<T> {
  constructor(...values: T[]) {
    super(...values);
  }

  get front() {
    return this.head;
  }

  enqueue(val: T) {
    this.append(val);
  }

  dequeue(): T {
    return this.removeHead();
  }
}
