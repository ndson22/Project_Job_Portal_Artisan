<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Province;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProvinceController extends Controller
{
    public function getJobProvinces()
    {
        $jobProvince = Province::all();
        return response()->json($jobProvince);
    }
}
