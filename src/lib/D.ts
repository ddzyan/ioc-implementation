import { Task } from 'src/decorator';

export class D {
  @Task()
  getName() {
    console.log('class D');
  }
}
