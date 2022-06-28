import { Provider } from '../decorator/provider';

import { B } from './B';
@Provider()
export class A {
  b: B = undefined;
}
