<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Seeker;
use App\Models\SeekerExperience;
use Illuminate\Http\Request;

class SeekerExperienceController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        SeekerExperience::create($request->all());
        $seeker = Seeker::withRelationships($request->seeker_id);
        return response()->json($seeker);
    }

    public function show(SeekerExperience $seekerExperience)
    {
        return response()->json($seekerExperience);
    }

    public function update(Request $request, $id)
    {
        $seekerExperience = SeekerExperience::find($id);
        $seekerExperience->update($request->all());
        $seeker = Seeker::withRelationships($seekerExperience->seeker_id);
        return response()->json($seeker);
    }

    public function destroy($id)
    {
        //
    }
}
