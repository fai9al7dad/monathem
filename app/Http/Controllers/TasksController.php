<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Models\projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function addtask(Request $request){
        $request->validate([
            'body' => 'required'
        ]);

        $user_id = Auth::user()->id;

        $task = Tasks::create([
            'user_id' => $user_id,
            'projects_id' => $request->projectid,
            'body' => $request->body,
            'status' => 'todo',
        ]);

        return response()->json($task);

    }

    public function gettasks($projectid,$status){
        $user_id = Auth::user()->id;
        $task = Tasks::where([
            ['user_id', $user_id],
            ['projects_id' , $projectid],
            ['status' , $status],
        ])->get();
        return response()->json($task);
    }

    public function deletetask($taskid){
        Tasks::find($taskid)->delete();
    }

    public function updatetask(Request $request){
        $task = Tasks::find($request->id);
        $task->body = $request->body;
        $task->save();

    }

    public function changestatus($id,$ostatus,$nstatus){
        $task = Tasks::find($id);
        if($task->status != $nstatus){
            $task->status = $nstatus;
            $task->save();
        }
        if($task->status =='done'){
            $task->due_date =null;
            $task->save();
        }
        return response()->json([$task, $ostatus, $nstatus]);
    }

    public function setDueDate($id,$date){
        $task = Tasks::find($id);
        $task->due_date = $date;
        $task->save();
        return response()->json([$task,$date]);
    }

    public function deleteDueDate($id){
        $task = Tasks::find($id);
        $task->due_date = null;
        $task->save();
        return response()->json($task);
    }
    public function getalltasks(){
        $user_id = Auth::user()->id;
        $req = DB::table('projects')
        ->select('projects.color','projects.name', 'Tasks.*')
        ->join('Tasks', 'projects.id', '=','Tasks.projects_id')
        ->where('Tasks.user_id', $user_id)
        ->orderBy('Tasks.due_date')
        ->get();
        return response()->json($req);
    }
    public function gettasksproject(){
       
    }
}
