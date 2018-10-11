<?php

const BASE = 1000;

if (!function_exists('intdiv')) {
    function intdiv($a, $b) {
        return ($a - $a % $b) / $b;
    }
}

function readBigInt($string) {
    $result = [0];

    for ($charIdx = 0; $charIdx < strlen($string); $charIdx++) {
        for ($i = $result[0]; $i > 0; $i--) {
            if (!isset($result[$i + 1]))  {
                $result[$i + 1] = 0;
            }

            $result[$i + 1] = $result[$i + 1] + intdiv($result[$i] * 10, BASE);
            $result[$i] = ($result[$i] * 10) % BASE;
        }

        if (!isset($result[1])) {
            $result[1] = 0;
        }

        $result[1] = $result[1] + ord($string[$charIdx]) - ord('0');

        if ($result[$result[0] + 1] > 0) {
            $result[0]++;
        }
    }

    return $result;
}

function writeBigInt($number) {
    $result = $number[$number[0]];

    for ($i = $number[0] - 1; $i > 0; $i--) {
        $n = $number[$i];

        while (strlen($n) < strlen(intdiv(BASE, 10))) {
            $n = '0' . $n;
        }

        $result .= $n;
    }

    return $result;
}

function sumBinInt($a, $b) {
    $result = [0];

    $k = $a[0] > $b[0] ? $a[0] : $b[0];

    for ($i = 1; $i <= $k; $i++) {
        if (!isset($result[$i])) {
            $result[$i] = 0;
        }

        if (!isset($result[$i + 1])) {
            $result[$i + 1] = 0;
        }

        $x = isset($a[$i]) ? $a[$i] : 0;
        $y = isset($b[$i]) ? $b[$i] : 0;

        $result[$i + 1] = intdiv($result[$i] + $x + $y, BASE);
        $result[$i] = ($result[$i] + $x + $y) % BASE;
    }

    if (!isset($result[$k + 1])) {
        $result[$k + 1] = 0;
    }

    $result[0] = $result[$k + 1] === 0 ? $k : $k + 1;

    return $result;
}