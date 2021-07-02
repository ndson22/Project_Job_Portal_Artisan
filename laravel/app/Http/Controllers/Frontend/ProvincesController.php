<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Vanthao03596\HCVN\Models\Province;

class ProvincesController extends Controller
{

    public function index()
    {
        $provinces = Province::get();
        return response()->json($provinces);
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
