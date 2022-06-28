import { Provider, Inject } from '../decorator';

import { B } from './B';
@Provider()
export class A {
  @Inject()
  b: B;
}
