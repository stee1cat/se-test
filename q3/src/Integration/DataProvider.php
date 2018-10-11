<?php

namespace Integration;

class DataProvider implements DataProviderInterface {
    protected $host;
    protected $user;
    protected $password;

    /**
     * @param $host
     * @param $user
     * @param $password
     */
    public function __construct($host, $user, $password) {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * @param array $request
     *
     * @return array
     */
    public function get(array $request) {
        // returns a response from external service
    }
}