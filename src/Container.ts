import { run } from '@midwayjs/glob';

export class Container {
  private classTable = {};
  private cache = {};

  constructor(scanDir: string) {
    const files = run(['**/*.ts'], {
      cwd: scanDir,
      ignore: ['**/index.ts', '**/Container.ts', '**/build/**', '**/decorator/**']
    });

    for (const filePath of files) {
      const exports = require(filePath);
      for (const value of Object.values(exports)) {
        const containerName = Reflect.getMetadata('containerName', value); // 'a'
        if (containerName) {
          this.classTable[this.getName(value)] = value;
        }
      }
    }
  }

  getName(Module) {
    return Module.name.toLowerCase();
  }

  get(Module) {
    const moduleName = this.getName(Module);
    if (this.cache[moduleName]) {
      return this.cache[moduleName];
    }

    // 创建对象
    const obj = new Module();

    // 缓存起来下次用
    this.cache[moduleName] = obj;

    // 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    const properties = Object.getOwnPropertyNames(obj);
    for (const p of properties) {
      if (!obj[p]) {
        // 如果对象不存在，就往下创建
        if (this.classTable[p]) {
          obj[p] = this.get(this.classTable[p]);
        }
      }
    }
    return obj;
  }

  bind(Module) {
    const moduleName = this.getName(Module);
    if (this.cache[moduleName]) {
      return;
    }

    const obj = new Module();

    this.cache[moduleName] = obj;

    // 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    const properties = Object.getOwnPropertyNames(obj);
    for (const p of properties) {
      if (!obj[p]) {
        // 如果对象不存在，就往下创建
        if (this.classTable[p]) {
          obj[p] = this.get(this.classTable[p]);
        }
      }
    }
    return obj;
  }
}
