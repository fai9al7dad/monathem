<?php

namespace App\Http\Controllers;

use App\Models\projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function getproject($projectid){
        $user_id = Auth::user()->id;
        $project = projects::where([
            ['user_id', $user_id],
            ['id' , $projectid]
        ])->get();
        return response()->json($project);
    }

    public function deleteproject($projectid){
        $project = projects::find($projectid);
        $project->delete();
        return response()->json($project);
    }

    public function changeProjectColor(Request $request){
        $request->validate([
            'color' => 'required'
        ]);
        $project = projects::find($request->id);
        $project->color = $request->new_color;
        $project->save();
        return response()->json($request->new_color);

    }
}
