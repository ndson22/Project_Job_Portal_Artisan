<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Company;
use App\Models\JobPost;
use App\Traits\ImageTrait;
use App\Mail\VerifyCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\CompanyFormRequest;

class CompanyController extends Controller
{
    use ImageTrait;

    public function index()
    {
        $companies = Company::with(['province', 'user'])->get();
        return response()->json($companies);
    }

    public function getCompany()
    {
        $jobCompany = JobPost::with('company')->groupBy('company_id')
        ->select('company_id', DB::raw('count(*) as total'))->orderBy('total', 'desc')->take(20)->get();
        return response()->json($jobCompany);
    }

    public function store(CompanyFormRequest $request)
    {
        $company = new Company();
        $company->fill($request->except('image'));
        $company->code = $company->short_name;
        $this->storeImage($request, $company, 'image', 'company');
        $company->save();

        $company->code = $company->short_name . $company->id . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT);
        $company->save();

        return response()->json($company->withRelationships($company), 201);
    }

    public function show(Company $company)
    {
        return response()->json($company->withRelationships($company));
    }

    public function update(CompanyFormRequest $request, Company $company)
    {
        $company->fill($request->all());
        $company->code = $company->short_name . $company->id . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT);
        $company->update();
        $company = $company->withRelationships($company);
        return response()->json($company);
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

    public function lock(Request $request, Company $company)
    {
        $this->authorize('verify', $company);

        $company->locked_at = $company->locked_at ? null : now();
        $company->update();
        // Mail::to($company->user->email)->queue(new VerifyCompany($company));
        return response()->json($company);
    }

    public function sponsor(Request $request, Company $company)
    {
        $this->authorize('verify', $company);
        $company->sponsored_at = $company->sponsored_at ? null : now();
        $company->update();
        // Mail::to($company->user->email)->queue(new VerifyCompany($company));
        return response()->json($company);
    }

    public function uploadImage(Request $request, Company $company)
    {
        if (!$request->has('file')) {
            return response()->json($request, 400);
        }
        $this->storeImageZorro($request, $company, 'file', 'company');
        $company->update();
        $company = $company->withRelationships($company);
        return response()->json($company);
    }
}
