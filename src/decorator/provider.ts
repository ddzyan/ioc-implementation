export const Provider = () => {
  return (target: any) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('containerName', target.name, target);
  };
};
