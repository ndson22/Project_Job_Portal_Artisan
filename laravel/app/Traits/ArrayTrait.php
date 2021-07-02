<?php

namespace App\Traits;

trait ArrayTrait
{
    public function changeKey(&$arr, $oldKey, $newKey)
    {
        $arr[$newKey] = $arr[$oldKey];
        unset($arr[$oldKey]);
    }
}
