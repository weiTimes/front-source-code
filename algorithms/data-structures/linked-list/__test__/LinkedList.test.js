import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should create list node with value', () => {
    const node = new LinkedList(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });
});
