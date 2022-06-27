import { A } from './lib/A';
import { Container } from './Container';

const container = new Container();
const a = container.get(A);
a.b.c.hello();
