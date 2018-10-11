<?php

namespace Decorator;

use Integration\DataProviderInterface;

class CacheDecorator implements DataProviderInterface {
    /**
     * @var CacheItemPoolInterface
     */
    protected $cache;

    /**
     * @var DataProviderInterface
     */
    protected $provider;

    public function __construct(CacheItemPoolInterface $cache, DataProviderInterface $provider) {
        $this->cache = $cache;
        $this->provider = $provider;
    }

    public function get(array $request) {
        $cacheKey = $this->getCacheKey($request);
        $cacheItem = $this->cache->getItem($cacheKey);

        if ($cacheItem->isHit()) {
            return $cacheItem->get();
        }

        $result = $this->provider->get($request);

        $cacheItem->set($result)
            ->expiresAt((new \DateTime())->modify('+1 day'));

        return $result;
    }

    public function getCacheKey(array $request) {
        return json_encode($request);
    }
}