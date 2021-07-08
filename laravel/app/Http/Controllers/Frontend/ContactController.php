<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Company;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $contact = new Contact();
        $contact->fill($request->all());
        $contact->save();
        return response()->json($contact);
    }
}
