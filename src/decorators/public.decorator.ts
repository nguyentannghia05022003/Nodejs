import 'reflect-metadata';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';

export const publicRoute = (handler: any) => {
    Reflect.defineMetadata(IS_PUBLIC_ROUTE, true, handler);

    const wrappedHandler = (...args: any[]) => handler(...args);
    Reflect.getOwnMetadataKeys(handler).forEach(key => {
        const value = Reflect.getMetadata(key, handler);
        Reflect.defineMetadata(key, value, wrappedHandler);
    });
    return wrappedHandler;
};