<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\JobPost;
use Exception;

class JobController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $jobPost = new JobPost();
            $jobPost->fill($request->all());
            $jobPost->user_id = 1;
            $jobPost->job_code = 'CODE' . '1';
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
