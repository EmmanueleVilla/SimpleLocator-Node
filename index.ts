interface ObjectFactories {
    [key: string]: () => Object
}

interface SingletonFactories {
    [key: string]: () => Object
}

interface Singletons {
    [key: string]: Object
}

export class SimpleLocator {
    private static factoriesMap : ObjectFactories = { }
    private static singletonsMap : SingletonFactories = { }
    private static singletonsBuiltMap : Singletons = { }

    public static reset() {
        this.factoriesMap = { }
    }

    public static set(key: string, factory: () => Object) {
        this.factoriesMap[key] = factory
    }

    public static setSingleton(key: string, factory: () => Object) {

        if(this.factoriesMap[key] != null) {
            delete this.factoriesMap[key]
        }

        this.singletonsMap[key] = factory
    }

    public static get(key: string) : Object | null {
        if(this.factoriesMap[key] != null) {
            return this.factoriesMap[key]()
        }

        if(this.singletonsBuiltMap[key] != null) {
            return this.singletonsBuiltMap[key];
        }

        if(this.singletonsMap[key] != null) {
            this.singletonsBuiltMap[key] = this.singletonsMap[key]()
            return this.get(key)
        }

        return null
    }
}
