import { Provider, Inject } from '../decorator';

import { C } from './C';

@Provider()
export class B {
  @Inject()
  c: C;
}
