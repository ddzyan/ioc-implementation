# 简介

源码实现 IOC 和 DI，核心实现 Container 类型，初始化自动扫描目录下所有文件，在获取指定对象的时候进行初始化和缓存，并且返回此对象的实例，解耦对象之间的耦合