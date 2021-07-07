<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Company;
use App\Models\Contact;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ContactController extends Controller
{

        public function store(Request $request)
    {
            $conTact = new Contact();
            $conTact->fill($request->all());
            $conTact->company_id = Company::where('user_id', Auth::id())->pluck('id')[0];
            $conTact->save();
            return response()->json($conTact);
    }
}
