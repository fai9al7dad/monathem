<?php

namespace App\Models;

use App\Models\User;
use App\Models\tasks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class projects extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
    ];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function tasks(){
        return $this->hasMany(tasks::class);
    }
}
