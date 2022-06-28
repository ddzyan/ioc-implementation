import { Provider } from '../decorator/provider';

@Provider()
export class C {
  hello() {
    console.log('hello world');
  }
}
