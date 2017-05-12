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
      const Component1 = { template: '<p id="a"></p>' };
      const Component2 = { template: '<p id="b"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component1);
      this.comp1 = this.componentWrap.mount();
      this.comp2 = this.componentWrap.mount(Component2);
    });

    it('calls $destroy on the all mounted components', function() {
      spyOn(this.comp1, '$destroy').and.callThrough();
      spyOn(this.comp2, '$destroy').and.callThrough();

      this.componentWrap.destroy();

      expect(this.comp1.$destroy).toHaveBeenCalled();
      expect(this.comp2.$destroy).toHaveBeenCalled();
    });

    it('removes the component elements from the DOM', function() {
      this.componentWrap.destroy();

      expect(document.getElementById('a')).toBe(null);
      expect(document.getElementById('b')).toBe(null);
    });

    it('does not throw an error if called multiple times', function() {
      this.componentWrap.destroy();
      expect(() => this.componentWrap.destroy()).not.toThrow();

      expect(document.getElementById('a')).toBe(null);
    });
  });
});
