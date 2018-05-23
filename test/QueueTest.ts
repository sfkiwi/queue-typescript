import { expect } from 'chai';
import { Queue } from '../src/index'

class Foo {
  private val: number;
  constructor(val: number) {
    this.val = val;
  }

  get bar() {
    return this.val;
  }
}

describe('Queue Tests', () => {
  it('should create an empty queue #1', () => {
    let values: number[] = [];

    // pass in the contents of an empty array
    let queue = new Queue<number>(...values);
    expect(queue.length).to.equal(0);
    expect(queue.front).to.be.null;
  });

  it('should create an empty queue #2', () => {

    // call the constructor without any arguments
    let queue = new Queue<number>();
    expect(queue.length).to.equal(0);
    expect(queue.front).to.be.null;
  });

  it('should create a queue with a single value', () => {
    let queue = new Queue<number>(4);
    expect(queue.length).to.equal(1);
    expect(queue.front).to.equal(4);
  });

  it('should create a Queue with mutiple initial values', () => {
    let values: number[] = [4, 5, 6]
    let queue = new Queue<number>(...values);
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
  })

  it('should allow "any" type', () => {
    let values: any[] = [4, { hello: 'world' }, 'hello']
    let queue = new Queue<any>(...values);
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
  });

  it('should allow custom types', () => {
    let foo1 = new Foo(4);
    let foo2 = new Foo(5);
    let foo3 = new Foo(6);
    let foo4 = new Foo(7);

    let queue = new Queue<Foo>(foo1, foo2, foo3, foo4);
    expect(queue.length).to.equal(4);
    expect(queue.front).to.equal(foo1);
    expect(queue.front.bar).to.equal(foo1.bar);
  });

  it('should enqueue a value to the back of the queue', () => {
    let values: number[] = [4, 5, 6]
    let queue = new Queue<number>(...values);
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
    queue.enqueue(7);
    expect(queue.length).to.equal(4);
    expect(queue.front).to.equal(4);
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    expect(queue.length).to.equal(1);
    expect(queue.front).to.equal(7);
  });

  it('should enqueue a value to the back of an emptyqueue', () => {
    let queue = new Queue<number>();
    expect(queue.length).to.equal(0);
    expect(queue.front).to.be.null;
    queue.enqueue(1);
    expect(queue.length).to.equal(1);
    expect(queue.front).to.equal(1);
  });

  it('should dequeue a value from the front of the queue', () => {
    let values: number[] = [4, 5, 6]
    let queue = new Queue<number>(...values);
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
    let val = queue.dequeue();
    expect(queue.length).to.equal(2);
    expect(queue.front).to.equal(5);
    expect(val).to.equal(4);
  });

  it('should handle dequeueing a value from an empty queue', () => {
    let queue = new Queue<number>();
    expect(queue.length).to.equal(0);
    expect(queue.front).to.be.null;
    expect(queue.tail).to.be.null;
    let val = queue.dequeue()
    expect(queue.length).to.equal(0);
    expect(queue.front).to.be.null;
    expect(val).to.be.undefined;
  });

  it('should convert the queue to an array', () => {
    let values: number[] = [4, 5, 6]
    let queue = new Queue<number>(...values);
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
    let result = queue.toArray()
    expect(queue.length).to.equal(3);
    expect(queue.front).to.equal(4);
    expect(result).to.deep.equal(values);
  });
});