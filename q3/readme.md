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

## Task

**Задание:** Проведите Code Review. Необходимо написать, с чем вы не согласны и почему.

**Дополнительное задание:** Напишите свой вариант. Решение должно быть представлено в виде ссылки на [codeshare.io](http://codeshare.io/).

**Требования были:** Добавить возможность получения данных от стороннего сервиса.

```php
<?php

namespace src\Integration;

class DataProvider
{
    private $host;
    private $user;
    private $password;

    /**
     * @param $host
     * @param $user
     * @param $password
     */
    public function __construct($host, $user, $password)
    {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * @param array $request
     *
     * @return array
     */
    public function get(array $request)
    {
        // returns a response from external service
    }
}
```

```php
<?php

namespace src\Decorator;

use DateTime;
use Exception;
use Psr\Cache\CacheItemPoolInterface;
use Psr\Log\LoggerInterface;
use src\Integration\DataProvider;

class DecoratorManager extends DataProvider
{
    public $cache;
    public $logger;

    /**
     * @param string $host
     * @param string $user
     * @param string $password
     * @param CacheItemPoolInterface $cache
     */
    public function __construct($host, $user, $password, CacheItemPoolInterface $cache)
    {
        parent::__construct($host, $user, $password);
        $this->cache = $cache;
    }

    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * {@inheritdoc}
     */
    public function getResponse(array $input)
    {
        try {
            $cacheKey = $this->getCacheKey($input);
            $cacheItem = $this->cache->getItem($cacheKey);
            if ($cacheItem->isHit()) {
                return $cacheItem->get();
            }

            $result = parent::get($input);

            $cacheItem
                ->set($result)
                ->expiresAt(
                    (new DateTime())->modify('+1 day')
                );

            return $result;
        } catch (Exception $e) {
            $this->logger->critical('Error');
        }

        return [];
    }

    public function getCacheKey(array $input)
    {
        return json_encode($input);
    }
}
```

## Result

Решение: [https://codeshare.io/2K7mEM](codeshare.io)

Реализация паттерна декоратор не совсем корректная. Используется наследование за место композиции - это часто приводит к не гибкой и не удобной в сопровождении архитектуре. Что будет если вызвать метод `get()` у класса `DecoratorManager`, будет ли он соответствовать ожидаемому поведению? То есть, в приведённом варианте, мы не можем передать декорируемый объект вместо исходного. Так же мы не можем декорировать объект в любой момент времени и произвольным количеством декораторов.