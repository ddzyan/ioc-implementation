import { Provider } from '../decorator';

@Provider()
export class C {
  hello() {
    console.log('hello world');
  }
}
