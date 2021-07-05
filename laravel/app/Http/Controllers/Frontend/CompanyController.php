<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyFormRequest;
use App\Mail\VerifyCompany;
use App\Models\Company;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CompanyController extends Controller
{
    use ImageTrait;

    public function index()
    {
        $companies = Company::with(['province', 'user'])->get();
        return response()->json($companies);
    }

    public function store(CompanyFormRequest $request)
    {
        $company = new Company();
        $company->fill($request->except('image'));
        $company->code = $company->short_name;
        $this->storeImage($request, $company, 'image', 'company');
        $company->save();

        $company->code = $company->short_name . $company->id;
        $company->save();

        return response()->json($company, 201);
    }

    public function show(Company $company)
    {
        return response()->json($company);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function verify(Request $request, Company $company)
    {
        $this->authorize('verify', $company);

        $company->verified_at = $company->verified_at ? null : now();
        $company->update();

        Mail::to($company->user->email)->queue(new VerifyCompany($company));

        return response()->json($company);
    }
}
