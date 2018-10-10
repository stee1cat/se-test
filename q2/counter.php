<?php

$fileName = 'counter.txt';
$handle = fopen($fileName, 'r+');
$fileSize = filesize($fileName);

while (!flock($handle, LOCK_EX)) {
    // nope
}

$counter = (int) fread($handle, $fileSize);
$counter++;

ftruncate($handle, 0);
fwrite($handle, $counter);
fflush($handle);
flock($handle, LOCK_UN);

fclose($handle);