<?php

namespace App\Http\Controllers;

use App\Models\EmployeePosition;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\JobPost;
use App\Models\JobType;
use App\Models\TypeOfEmployment;
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
            return response()->json([
                'jobTypes' => $jobTypes,
                'employeePositions' => $employeePositions,
                'typeOfEmployments' => $typeOfEmployments,
                'genders' => $genders,
                'status' => 200
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
    }
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $jobPost = new JobPost();
            $jobPost->fill($request->all());
            $jobPost->user_id = 1;
            $jobPost->save();

            DB::commit();
            return response()->json(['jobPost' => $jobPost, 'status' => 200]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage(), 'status' => 400]);
        }
    }
}
