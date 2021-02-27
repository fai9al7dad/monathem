<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login (Request $request){

        $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email','password'))){
            return response()->json(Auth::user(),200);
        }

    }

    public function logout(){
        Auth::logout();
    }
}
