import JasmineVueWrapper from './../../src/JasmineVueWrapper';
import Vue from 'vue';

describe('JasmineVueWrapper', function() {
  describe('#mount', function() {
    beforeEach(function() {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'wrapper');
      const mountPoint = document.createElement('div');
      mountPoint.setAttribute('class', 'mountPoint');
      wrapper.appendChild(mountPoint);
      document.body.appendChild(wrapper);
    });
    afterEach(function() {
      this.componentWrap.destroy();
      document.body.removeChild(document.querySelector('.wrapper'));
    });

    it('mounts a Vue component to page body', function() {
      const Component = { template: '<p id="a"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component);

      this.componentWrap.mount();

      expect(document.getElementById('a')).toBeTruthy();
    });

    it('mounts a Vue component to class selector', function() {
      const Component = { template: '<p id="a"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component);
      this.componentWrap.mount({ el: '.mountPoint' });
      const wrapperEl = document.querySelector('.wrapper');
      expect(wrapperEl.firstElementChild.outerHTML).toEqual('<p id="a"></p>');
    });

    it('mounts a Vue component to an element', function() {
      const Component = { template: '<p id="a"></p>' };
      this.componentWrap = new JasmineVueWrapper(Component);
      const mountPoint = document.querySelector('.mountPoint');
      this.componentWrap.mount({ el: mountPoint });
      const wrapperEl = document.querySelector('.wrapper');
      expect(wrapperEl.firstElementChild.outerHTML).toEqual('<p id="a"></p>');
    });

    it('uses default props if provided on initilialization', function() {
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

      this.componentWrap.mount({ propsData: { id: 'c' } });

      expect(document.getElementById('b')).toBe(null);
      expect(document.getElementById('c')).toBeTruthy();
    });

    it('initializes a reactive store if provided during mount', function(done) {
      const Component = {
        template: '<p :id="id">{{$store.state.text}}</p>',
        props: ['id'],
      };

      this.componentWrap = new JasmineVueWrapper(Component);

      const store = {
        state: {
          text: 'initial text',
        },
      };

      this.componentWrap.mount({ propsData: { id: 'a' }, store });

      expect(document.getElementById('a').innerText).toMatch(store.state.text);

      store.state.text = 'updated text';

      Vue.nextTick(() => {
        expect(document.getElementById('a').innerText).toMatch(store.state.text);
        done();
      });
    });

    it('uses custom component properties if provided', function(done) {
      const Component = {
        template: '<p :id="id">text</p>',
        props: ['id'],
      };
      const beforeMount = jasmine.createSpy('component#beforeModel');

      this.componentWrap = new JasmineVueWrapper(Component);

      this.componentWrap.mount({ propsData: { id: 'a' }, componentOverrides: { beforeMount } });

      Vue.nextTick(() => {
        expect(beforeMount).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('#mountSolo', function() {
    afterEach(function() {
      this.componentWrap.destroy();
    });

    it('mounts a single Vue component to page body, clearing out any premounted components', function() {
      const Component = { template: '<div>Component</div>' };
      this.componentWrap = new JasmineVueWrapper(Component);

      const vm = this.componentWrap.mount();
      expect(vm.$el.offsetParent !== null).toBeTruthy();

      const vm2 = this.componentWrap.mountSolo();

      expect(vm.$el.offsetParent !== null).not.toBeTruthy();
      expect(vm2.$el.offsetParent !== null).toBeTruthy();
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
