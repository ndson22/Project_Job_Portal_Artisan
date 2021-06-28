<?php

namespace App\Http\Controllers;

use App\Models\EmployeePosition;
use App\Models\Gender;
use Illuminate\Http\Request;
use App\Http\Requests\StoreJobPostRequest;
use App\Models\JobLocation;
use Illuminate\Support\Facades\DB;
use App\Models\JobPost;
use App\Models\JobType;
use App\Models\TypeOfEmployment;
use Vanthao03596\HCVN\Models\Province;
use Exception;

class JobController extends Controller
{
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
            $jobPost->user_id = 1;
            $jobPost->company_id = 1;
            $jobPost->job_code = "CODE" . $jobPost->company_id;
            $jobPost->save();

            $jobPost->job_code = $jobPost->job_code . $jobPost->id;
            $jobPost->save();

            JobLocation::create([
                'id' => $jobPost->id,
                'province_id' => $request->province_id,
                'address' => $request->address
            ]);

            DB::commit();
            return response()->json(['jobPost' => $jobPost, 'status' => 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
    }

    public function get($id)
    {
        try {
            $jobPost = JobPost::find($id);
            $jobPost->location = Province::find($jobPost->jobLocation->province_id)->name;
            $jobPost->address = $jobPost->jobLocation->address;
            $jobPost->jobTypes = $jobPost->jobType->name;
            $jobPost->employeePositions = $jobPost->employeePosition->name;
            $jobPost->typeOfEmployments = $jobPost->typeOfEmployment->name;
            $jobPost->genders = $jobPost->gender->name;
            return response()->json($jobPost);
        } catch(Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 404]);
        }
    }
}
