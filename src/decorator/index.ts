export const INJECT = 'inject';
export const PROVIDER = 'provider';

export const Provider = (): ClassDecorator => {
  return (target) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata(PROVIDER, target.name, target);
  };
};

export const Inject = (): PropertyDecorator => {
  return (target, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    let m: Map<string, any>;

    if (Reflect.hasOwnMetadata(INJECT, target)) {
      m = Reflect.getMetadata(INJECT, target);
    } else {
      m = new Map<string, any>();
    }

    if (!m.has(key)) {
      m.set(key, []);
    }

    m.get(key).push(type);

    Reflect.defineMetadata(INJECT, m, target);
  };
};

export const Task = (): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('descriptor', descriptor.value);
    console.log('constructor name', target.constructor.name);
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('methodMetaData', 'b', target, propertyKey);
  };
};
