<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\EmployeePosition;
use App\Models\Gender;
use Illuminate\Http\Request;
use App\Http\Requests\StoreJobPostRequest;
use App\Models\JobLocation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\JobPost;
use App\Models\JobType;
use App\Models\TypeOfEmployment;
use Vanthao03596\HCVN\Models\Province;
use Exception;

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
                'status' => 200
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
    }

    public function store(StoreJobPostRequest $request)
    {
        try {
            DB::beginTransaction();
            $jobPost = new JobPost();
            $jobPost->fill($request->all());
            $jobPost->company_id = Auth::id();
            $jobPost->job_code = "CODE" . $jobPost->company_id;
            $jobPost->save();
            $jobPost->job_code = $jobPost->job_code . $jobPost->id;
            $jobPost->save();

            DB::commit();
            return response()->json(['jobPost' => $jobPost, 'status' => 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
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
        return response()->json(['jobPost'=>$jobPost, 'jobs'=>$jobs ]);
    }
}
