<?php

namespace App\Models;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends BaseModel
{
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

    protected $casts = [
        'date' => 'datetime',
    ];

    /**
     * Grant a Organiser permission to update his event
     * @return void
     */

    protected static function booted()
    {
        parent::booted();
        static::created(function ($event) {
            $organizer = User::findOrFail($event->organizer_id);
            $organizer->givePermission('events.' . $event->id . '.update');
        });

        static::deleted(function ($event) {
            $permissions = Permission::where('name', 'like', 'events.' . $event->id . '.%')->get();
            DB::table('users_permissions')->whereIn('permission_id', $permissions->pluck('id'))->delete();
            Permission::destroy($permissions->pluck('id'));
        });
    }

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