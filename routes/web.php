<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaController;

Route::get('/{any}', [SpaController::class, 'index'])->where('any', '.*');
