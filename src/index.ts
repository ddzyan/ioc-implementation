import 'reflect-metadata';

import { A } from './lib/A';
import { Container } from './Container';

const container = new Container(__dirname);
const a = container.get(A);
a.b.c.hello();
