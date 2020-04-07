<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    protected $table = 'user_detail';
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
