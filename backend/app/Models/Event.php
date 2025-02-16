<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

      protected $fillable = [
        'title', 
        'date', 
        'location', 
        'description', 
        'max_participants', 
        'organizer_id', 
        'category_id'
    ];

    // Define guarded fields (opposite of fillable)
    // protected $guarded = [];

    // Define timestamps (optional, defaults to true)
    // public $timestamps = false;

    protected $casts = [
        'date' => 'datetime',
    ];
    
    //  Relationships

    public function category()
{
    return $this->belongsTo(Category::class, 'category_id');
}
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_participant');
    }
}