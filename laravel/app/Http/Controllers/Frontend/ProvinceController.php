<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Province;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProvinceController extends Controller
{
    public function index() {
        $provinces = Province::orderBy('name')->get();
        return response()->json($provinces);
    }
}
