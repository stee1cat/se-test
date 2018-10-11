# Decorators

```php
/**
 * @var CacheItemPoolInterface $cache
 * @var LoggerInterface $logger
 * @var array $request
 */

// Set up a provider
$provider = new DataProvider('host', 'user', 'password');
$providerWithCache = new CacheDecorator($cache, $provider);
$providerWithCacheAndLogger = new LoggerDecorator($logger, $providerWithCache);

// Get some data
$result = $providerWithCacheAndLogger->get($request);
```