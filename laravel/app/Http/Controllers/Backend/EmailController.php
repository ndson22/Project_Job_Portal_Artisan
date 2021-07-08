<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function contactUs(Request $request)
    {
        return response()->json($request);
    }

    public function forwardJobDetail(Request $request)
    {
        $validatedData = $request->validate([
            'email' =>  'required|email|max:255'
        ]);

        return response()->json($validatedData);
    }
}
