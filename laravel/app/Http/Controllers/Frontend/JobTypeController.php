<?php

namespace App\Http\Controllers\Frontend;

use App\Models\JobType;
use App\Http\Controllers\Controller;


class JobTypeController extends Controller
{
    function getJobTypes()
    {
        $jobTypes = JobType::all();
        return response()->json($jobTypes);
    }
}
