import { Provider } from '../decorator/provider';

import { C } from './C';

@Provider()
export class B {
  c: C = undefined;
}
