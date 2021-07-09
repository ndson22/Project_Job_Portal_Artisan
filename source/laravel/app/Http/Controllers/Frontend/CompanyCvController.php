<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Seeker;
use Illuminate\Http\Request;

class CompanyCvController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function getContactByCompany($companyId)
    {
        $anonymousContacts = Contact::where('company_id', $companyId)->get();
        $company = Company::find($companyId);
        $seekerContacts = $company->seeker()->wherePivot('company_id', $companyId)->get();
        $results = [];
        foreach ($anonymousContacts as $anonymousContact) {
            $results[] = $anonymousContact;
        }

        foreach ($seekerContacts as $seekerContact) {
            $seekerContact->created_at = $seekerContact->pivot->created_at;
            $results[] = $seekerContact;
        }

        return response()->json($results);
    }

    public function getSeekerContact($seekerId)
    {
        $seekerContact = Seeker::withRelationships($seekerId);
        return response()->json($seekerContact);
    }

    public function getAnonymousContact($anonymousId)
    {
        $anonymousContact = Contact::find($anonymousId);
        return response()->json($anonymousContact);
    }

    public function storeSeekerContact($companyId, $seekerId) {
        $company = Company::find($companyId);
        $company->seeker()->attach($seekerId);
        return response()->json(['message' => 'Store successfully'], 201);
    }
}
