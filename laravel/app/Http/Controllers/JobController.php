<?php

namespace App\Http\Controllers;

use App\Models\EmployeePosition;
use App\Models\Gender;
use Illuminate\Http\Request;
use App\Http\Requests\StoreJobPostRequest;
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

            DB::commit();
            return response()->json(['jobPost' => $jobPost, 'status' => 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
    }
}
