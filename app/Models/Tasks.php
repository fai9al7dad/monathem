<?php

namespace App\Models;

use App\Models\projects;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class tasks extends Model
{
    use HasFactory;

    protected $attributes = [
        'due_date' => null
    ];

    protected $fillable = [
        'body',
        'user_id',
        'projects_id',
        'status'
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
    public function projects(){
        return $this->belongsTo(projects::class);
    }
}
