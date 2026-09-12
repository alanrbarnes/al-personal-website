<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'path', 'name', 'email', 'message', 'company',
        'role', 'project_type', 'budget', 'ip',
    ];
}
