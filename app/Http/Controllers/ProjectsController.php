<?php

namespace App\Http\Controllers;

use App\Models\projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{
    public function addproject(Request $request){

        $request->validate([
            'name' => 'required'
        ]);
        $project = $request->user()->projects()->create([
            'color' => $request->color,
            'name' => $request->name
        ]);
        return response()->json($project);
    
    }

    public function getProjects(){
        $user_id = Auth::user()->id;
        $projects = projects::where('user_id', $user_id)->get();
        return response()->json($projects);
    }
    
}
