<?php

namespace Decorator;

use Integration\DataProviderInterface;

class LoggerDecorator implements DataProviderInterface {
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var DataProviderInterface
     */
    protected $provider;

    public function __construct(LoggerInterface $logger, DataProviderInterface $provider) {
        $this->logger = $logger;
        $this->provider = $provider;
    }

    public function get(array $request) {
        try {
            return $this->provider->get($request);
        }
        catch (\Exception $e) {
            $this->logger->critical('Error');
        }

        return [];
    }
}