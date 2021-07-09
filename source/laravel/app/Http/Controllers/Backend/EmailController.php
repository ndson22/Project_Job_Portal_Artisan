<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Mail\ForwardJobDetail;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function contactUs(Request $request)
    {
        return response()->json($request);
    }

    public function forwardJobDetail(Request $request)
    {
        $validatedData = $request->validate([
            'email' =>  'required|email|max:255',
            'job_post_id' => 'required'
        ]);
        $jobPost = JobPost::withRelationships($request->job_post_id);

        Mail::to($request->email)->queue(new ForwardJobDetail($jobPost));

        return response()->json(['message' => 'Success']);
    }
}
