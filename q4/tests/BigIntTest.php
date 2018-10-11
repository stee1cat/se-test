<?php

use Codeception\Specify;
use Codeception\Test\Unit;

class BigIntTest extends Unit {
    use Specify;

    const NUMBER1_STR = '23851674';
    const NUMBER1_ARRAY = [3, 674, 851, 23, 0];

    public function testRead() {
        $this->assertEquals(self::NUMBER1_ARRAY, readBigInt(self::NUMBER1_STR));
    }

    public function testWrite() {
        $this->assertEquals(self::NUMBER1_STR, writeBigInt(self::NUMBER1_ARRAY));
    }

    public function testSum() {
        $this->specify('big interger', function () {
            $a = readBigInt('870613029451');
            $b = readBigInt('3475912100517461');
            $c = writeBigInt(sumBinInt($a, $b));

            $this->assertEquals('3476782713546912', $c);
        });

        $this->specify('small interger', function () {
            $a = readBigInt('9');
            $b = readBigInt('6');
            $c = writeBigInt(sumBinInt($a, $b));

            $this->assertEquals('15', $c);
        });
    }
}