import JasmineVueWrapper from './../../src/JasmineVueWrapper';

describe('JasmineVueWrapper', function() {
  describe('#mount', function() {
    afterEach(function() {
      this.componentWrap.destroy();
    });

    it('mounts a Vue component to page body', function() {
      const Component = { template: '<p id="a"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component);

      this.componentWrap.mount();

      expect(document.getElementById('a')).toBeTruthy();
    });

    it('uses default props if provided', function() {
      const Component = {
        template: '<p :id="id"></p>',
        props: ['id'],
      };
      this.componentWrap = new JasmineVueWrapper(Component, { id: 'b' });

      this.componentWrap.mount();

      expect(document.getElementById('b')).toBeTruthy();
    });

    it('uses custom props if provided during mount', function() {
      const Component = {
        template: '<p :id="id"></p>',
        props: ['id'],
      };
      this.componentWrap = new JasmineVueWrapper(Component, { id: 'b' });

      this.componentWrap.mount({ id: 'c' });

      expect(document.getElementById('b')).toBe(null);
      expect(document.getElementById('c')).toBeTruthy();
    });
  });

  describe('#destroy', function() {
    beforeEach(function() {
      const Component = { template: '<p id="a"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component);
      this.componentWrap.mount();
    });

    it('calls $destroy on the component', function() {
      spyOn(this.componentWrap.vm, '$destroy').and.callThrough();

      this.componentWrap.destroy();

      expect(this.componentWrap.vm.$destroy).toHaveBeenCalled();
    });

    it('removes the component element from the DOM', function() {
      this.componentWrap.destroy();

      expect(document.getElementById('a')).toBe(null);
    });

    it('does not throw an error if called multiple times', function() {
      this.componentWrap.destroy();
      expect(() => this.componentWrap.destroy()).not.toThrow();

      expect(document.getElementById('a')).toBe(null);
    });
  });
});
