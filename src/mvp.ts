class A {
  b: B = undefined;
}

class B {
  c: C = undefined;
}

class C {
  hello() {
    console.log('hello world');
  }
}

class Container {
  cache = {};

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

    // 拿到属性
    const properties = Object.getOwnPropertyNames(obj);
    for (const p of properties) {
      if (!obj[p]) {
        // 如果对象不存在，就往下创建
        if (p === 'b') {
          obj[p] = this.get(B);
        } else if (p === 'c') {
          obj[p] = this.get(C);
        }
      }
    }
    return obj;
  }
}
const container = new Container();
const a = container.get(A);
a.b.c.hello();
