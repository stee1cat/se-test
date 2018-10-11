<?php

namespace Integration;

interface DataProviderInterface {
    public function get(array $request);
}