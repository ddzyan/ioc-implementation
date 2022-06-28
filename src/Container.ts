import { run } from '@midwayjs/glob';

import { INJECT, PROVIDER } from './decorator';
export class Container {
  private cache = {};

  constructor(scanDir: string) {
    const files = run(['**/*.ts'], {
      cwd: scanDir,
      ignore: ['**/index.ts', '**/Container.ts', '**/build/**', '**/decorator/**']
    });

    for (const filePath of files) {
      const exports = require(filePath);
      for (const value of Object.values(exports)) {
        const containerName = Reflect.getMetadata(PROVIDER, value);
        if (containerName) {
          this.bind(value);
        }
      }
    }
  }

  getName(Module) {
    return Module.name.toLowerCase();
  }

  get(Module) {
    const moduleName = this.getName(Module);
    if (!this.cache[moduleName]) {
      throw new Error(`引用的 ${moduleName} 不在 container cache 中`);
    }
    return this.cache[moduleName];
  }

  bind(Module) {
    const moduleName = this.getName(Module);
    if (this.cache[moduleName]) {
      return this.cache[moduleName];
    }

    const obj = new Module();

    this.cache[moduleName] = obj;

    const propertyKey = Reflect.getMetadata(INJECT, obj);
    if (!propertyKey || propertyKey.size === 0) {
      return obj;
    }

    for (const [key, valueList] of propertyKey.entries()) {
      if (!obj[key]) {
        // 如果对象不存在，就往下创建
        for (const value of valueList) {
          obj[key] = this.bind(value);
        }
      }
    }

    return obj;
  }
}
