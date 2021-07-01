<?php

namespace App\Http\Controllers\Frontend;

use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\Gender;
use App\Models\Company;
use App\Models\JobPost;
use App\Models\JobType;
use App\Models\JobLocation;
use Illuminate\Http\Request;
use App\Models\EmployeePosition;
use App\Models\TypeOfEmployment;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Vanthao03596\HCVN\Models\Province;
use App\Http\Requests\StoreJobPostRequest;

class JobController extends Controller
{
    public function getAll(){
        $jobPosts = JobPost::all();
        foreach ($jobPosts as $key => $jobPost) {
            $jobPost->name = $jobPost->company->name;
            $jobPost->address = $jobPost->company->address;
            $jobPost->jobTypes = $jobPost->jobType->name;
            $jobPost->employeePositions = $jobPost->employeePosition->name;
            $jobPost->typeOfEmployments = $jobPost->typeOfEmployment->name;
        }
        return response()->json($jobPosts);
    }

    public function getJobInfo()
    {
        try {
            $jobTypes = JobType::all();
            $employeePositions = EmployeePosition::all();
            $typeOfEmployments = TypeOfEmployment::all();
            $genders = Gender::all();
            $provinces = Province::all();
            return response()->json([
                'jobTypes' => $jobTypes,
                'employeePositions' => $employeePositions,
                'typeOfEmployments' => $typeOfEmployments,
                'genders' => $genders,
                'provinces' => $provinces,
            ]);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 400);
        }
    }

    public function store(StoreJobPostRequest $request)
    {
        try {
            DB::beginTransaction();
            $jobPost = new JobPost();
            $jobPost->fill($request->all());
            $jobPost->company_id = Company::where('user_id', Auth::id())->pluck('id')[0];
            $jobPost->job_code = "CODE" . $jobPost->company_id;
            $jobPost->save();
            $jobPost->job_code = $jobPost->job_code . $jobPost->id;
            $jobPost->save();

            DB::commit();
            return response()->json($jobPost);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage(), 400);
        }
    }

    public function search(Request $request)
    {
        if ($request->search === null) {
            $jobPosts = JobPost::all();
        } else {
            $jobPosts = JobPost::where(function ($query) use ($request) {
                if ($request->job_type_id === null && $request->province_id === null) {
                    $query->where('title', 'like', '%' . $request->search . '%');
                } else if ($request->job_type_id !== null && $request->province_id === null) {
                    $query->where('title', 'like', '%' . $request->search . '%')
                        ->where('job_type_id', $request->job_type_id);
                } else if ($request->province_id !== null) {
                    $companies = Company::where('province_id', $request->province_id)->get();
                    $companiesId = [];
                    foreach ($companies as $company) {
                        $companiesId[] = $company->id;
                    }
                    if ($request->job_type_id === null) {
                        $query->where('title', 'like', '%' . $request->search . '%')
                            ->whereIn('company_id', $companiesId);
                    } else {
                        $query->where('title', 'like', '%' . $request->search . '%')
                            ->where('job_type_id', $request->job_type_id)
                            ->whereIn('company_id', $companiesId);
                    }
                }
            })->orWhere(function ($query) use ($request) {
                if ($request->job_type_id === null && $request->province_id === null) {
                    $query->where('description', 'like', '%' . $request->search . '%');
                } else if ($request->job_type_id !== null && $request->province_id === null) {
                    $query->where('description', 'like', '%' . $request->search . '%')
                        ->where('job_type_id', $request->job_type_id);
                } else if ($request->province_id !== null) {
                    $companies = Company::where('province_id', $request->province_id)->get();
                    $companiesId = [];
                    foreach ($companies as $company) {
                        $companiesId[] = $company->id;
                    }
                    if ($request->job_type_id === null) {
                        $query->where('description', 'like', '%' . $request->search . '%')
                            ->whereIn('company_id', $companiesId);
                    } else {
                        $query->where('description', 'like', '%' . $request->search . '%')
                            ->where('job_type_id', $request->job_type_id)
                            ->whereIn('company_id', $companiesId);
                    }
                }
            })->get();
        }
        return response()->json($jobPosts);
    }

    public function getDetail($id)
    {
        $jobPost = JobPost::find($id);
        $jobPost->address = $jobPost->company->address;
        $jobPost->jobTypes = $jobPost->jobType->name;
        $jobPost->employeePositions = $jobPost->employeePosition->name;
        $jobPost->typeOfEmployments = $jobPost->typeOfEmployment->name;
        $jobPost->genders = $jobPost->gender->name;
        $jobs = JobPost::where('job_type_id' , $jobPost->job_type_id)->latest()->take(3)->get();
        $company = Company::find($jobPost->company_id);
        $company->location = $company->province->name;
        $company->jobPostAmount = JobPost::where('company_id', $company->id)->where('is_active', 1)->count();
        return response()->json(['jobPost'=>$jobPost, 'jobs'=>$jobs, 'company' => $company]);
    }
}
