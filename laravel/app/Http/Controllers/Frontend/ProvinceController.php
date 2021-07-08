<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Province;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProvinceController extends Controller
{
    public function index() {
        $provinces = Province::all();
        return response()->json($provinces);
    }

    public function getProvin()
    {
        $provinceSearch = Province::take(21)->get();
        return response()->json($provinceSearch);
    }
}
