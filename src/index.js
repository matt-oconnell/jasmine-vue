/* eslint-env jasmine */
import { setBeforeEachFunctions, removeComponent } from './setup';

beforeEach(setBeforeEachFunctions);
afterEach(removeComponent);
