<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\ProjectController;

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/auth', function (Request $request) {
    return true;
});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::post('/projects', [ProjectsController::class, 'addproject']);
Route::get('/projects', [ProjectsController::class, 'getprojects']);

Route::post('/tasks', [TasksController::class, 'addtask']);
Route::get('/tasks/{project}/{status}', [TasksController::class, 'gettasks']);
Route::delete('/tasks/{task}', [TasksController::class, 'deletetask']);
Route::post('/edittask', [TasksController::class, 'updatetask']);
Route::post('changetaskstatus/{id}/{ostatus}/{nstatus}' , [TasksController::class, 'changestatus']);
Route::post('setduedate/{id}/{date}', [TasksController::class, 'setDueDate']);
Route::get('/alltasks', [TasksController::class, 'getalltasks']);
Route::post('deleteduedate/{id}', [TasksController::class, 'deleteDueDate']);


Route::get('/project/{project}', [ProjectController::class, 'getproject']);
Route::delete('/deleteproject/{project}', [ProjectController::class, 'deleteproject']);
Route::post('/changeprojectcolor', [ProjectController::class, 'changeProjectColor']);

