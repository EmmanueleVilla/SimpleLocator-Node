"use strict";
exports.__esModule = true;
var SimpleLocator = /** @class */ (function () {
    function SimpleLocator() {
    }
    SimpleLocator.reset = function () {
        this.factoriesMap = {};
    };
    SimpleLocator.set = function (key, factory) {
        this.factoriesMap[key] = factory;
    };
    SimpleLocator.setSingleton = function (key, factory) {
        if (this.factoriesMap[key] != null) {
            delete this.factoriesMap[key];
        }
        this.singletonsMap[key] = factory;
    };
    SimpleLocator.get = function (key) {
        if (this.factoriesMap[key] != null) {
            return this.factoriesMap[key]();
        }
        if (this.singletonsBuiltMap[key] != null) {
            return this.singletonsBuiltMap[key];
        }
        if (this.singletonsMap[key] != null) {
            this.singletonsBuiltMap[key] = this.singletonsMap[key]();
            return this.get(key);
        }
        return null;
    };
    SimpleLocator.factoriesMap = {};
    SimpleLocator.singletonsMap = {};
    SimpleLocator.singletonsBuiltMap = {};
    return SimpleLocator;
}());
exports.SimpleLocator = SimpleLocator;

