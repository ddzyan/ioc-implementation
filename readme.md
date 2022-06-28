# 简介

源码实现 IOC 和 DI，核心实现 Container 类型，初始化自动扫描目录下所有文件，在获取指定对象的时候进行初始化和缓存，并且返回此对象的实例，解耦对象之间的耦合

参考资料：

- [Reflect Metadata](https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E8%8E%B7%E5%8F%96%E7%B1%BB%E5%9E%8B%E4%BF%A1%E6%81%AF)

# 版本迭代记录

## v1.0.0

自动加载指定目录下的所有类到 Container 中，类之间的引用都通过 Container 进行解耦

## v1.1.0

增加 Provider 装饰器，之间配置了这个装饰器的类型自动加载到 Container 中
