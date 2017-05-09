import {
  componentCache,
  destroyComponents,
  setInitializer,
  vueInit,
} from '../../src/setup';
import JasmineVueWrapper from './../../src/JasmineVueWrapper';

describe('src/setup', function() {
  beforeEach(function() {
    this.setInitializer = setInitializer;
    this.destroyComponents = destroyComponents;
  });

  afterEach(function() {
    destroyComponents();
  });

  describe('#setInitializer', function() {
    it('binds vueInit to the current test context', function() {
      setInitializer.call(this);

      expect(this.vueInit).toBe(vueInit);
    });
  });

  describe('#vueInit', function() {
    it('returns a new instance of JasmineVueWrapper', function() {
      this.setInitializer();
      const wrapper = this.vueInit({});

      expect(wrapper instanceof JasmineVueWrapper).toBeTruthy();
    });
  });

  describe('#destroyComponents', function() {
    beforeEach(function() {
      this.setInitializer();
      const Component = { template: '<p id="a"></p>' };

      this.componentWrap = this.vueInit(Component);
      this.componentWrap2 = this.vueInit(Component);
    });

    it('clears the component cache', function() {
      expect(componentCache[0]).toBe(this.componentWrap);
      expect(componentCache[1]).toBe(this.componentWrap2);

      destroyComponents();

      expect(componentCache.length).toBe(0);
    });

    it('calls destroy on each cached component', function() {
      spyOn(this.componentWrap, 'destroy');
      spyOn(this.componentWrap2, 'destroy');

      destroyComponents();

      expect(this.componentWrap.destroy).toHaveBeenCalled();
      expect(this.componentWrap2.destroy).toHaveBeenCalled();
    });
  });
});
