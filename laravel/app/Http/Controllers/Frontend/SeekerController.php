<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Seeker;
use App\Traits\ImageTrait;

class SeekerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    use ImageTrait;

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Seeker $seeker)
    {
        $seeker = Seeker::withRelationships($seeker->id);
        return response()->json($seeker);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Seeker $seeker)
    {
        $seeker->update($request->all());
        $seeker = Seeker::withRelationships($seeker->id);
        return response()->json($seeker);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function changeAvatar(Request $request, Seeker $seeker)
    {
        $this->storeImage($request, $seeker, 'image', 'seeker');
        $seeker->save();
        $seeker = Seeker::withRelationships($seeker->id);
        return response()->json($seeker);
    }
}
