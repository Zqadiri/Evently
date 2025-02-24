<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class EventController extends CrudController
{
    protected $table = 'events';

    protected $rules = [
        'title' => 'required|string',
        'date' => 'required',
        'location' => 'required|string',
        'description' => 'required|string',
        'image' => 'nullable|string',
        'max_participants' => 'required|integer',
        'is_registred' => 'boolean',
        'user_id' => 'integer',
    ];
    protected $modelClass = Event::class;
    /**
     * Get the table name associated with the events.
     *
     * @return string
     */
    protected function getTable()
    {
        return 'events';
    }

    /**
     * Get the model class associated with the events.
     *
     * @return string
     */
    protected function getModelClass()
    {
        return Event::class;
    }

    public function readAll(Request $request)
    {
        $user = $request->user();
    
        if (in_array('read_all', $this->restricted)) {
            if (! $user->hasPermission($this->table, 'read')) {
                return response()->json([
                    'success' => false,
                    'errors' => ['permission denied'],
                ]);
            }
        }
    
        $events = Event::with(['category', 'participants', 'organizer'])
            ->withCount('participants')
            ->get();
    
        $events->each(function ($event) use ($user) {
            $event->isRegistered = $event->participants->contains($user->id);
        });
    
        if (method_exists($this, 'afterReadAll')) {
            $this->afterReadAll($events);
        }
    
        return response()->json([
            'success' => true,
            'data' => ['items' => $events],
        ]);
    }
    
    public function readOne($id, Request $request)
    {
        $user = $request->user();
    
        if (in_array('read_all', $this->restricted)) {
            if (! $user->hasPermission($this->table, 'read')) {
                return response()->json([
                    'success' => false,
                    'errors' => ['permission denied'],
                ]);
            }
        }
    
        $event = Event::with(['category', 'participants', 'organizer'])
            ->withCount('participants')
            ->find($id);
    
        if (!$event) {
            return response()->json([
                'success' => false,
                'errors' => ['event not found'],
            ]);
        }
    
        $event->isRegistered = $event->participants->contains($user->id);
    
        if (method_exists($this, 'afterReadAll')) {
            $this->afterReadAll($event);
        }
    
        return response()->json([
            'success' => true,
            'data' => ['items' => $event],
        ]);
    }

    public function updateOne($id, Request $request)
    {
        $request->validate($this->rules);

        $formattedDatetime = Carbon::parse($request->date)->format('Y-m-d H:i:s');
        $request->merge(['date' => $formattedDatetime]);

        //! need to add the cancel option to the event logic

        return parent::updateOne($id, $request);
    }

    public function readOwn(Request $request)
    {
        $user = $request->user();
    
        if (in_array('read_own', $this->restricted)) {
            if (! $user->hasPermission($this->table, 'read_own')) {
                return response()->json([
                    'success' => false,
                    'errors' => ['permission denied'],
                ]);
            }
        }
    
        $events = Event::with(['category', 'participants', 'organizer'])
            ->withCount('participants')
            ->where('organizer_id', $user->id)
            ->get();
    
        if (method_exists($this, 'afterReadAll')) {
            $this->afterReadAll($events);
        }
    
        return response()->json([
            'success' => true,
            'data' => ['items' => $events],
        ]);
    }

public function readRegistered(Request $request)
{
    $user = $request->user();

    if (in_array('read', $this->restricted)) {
        if (! $user->hasPermission($this->table, 'read')) {
            return response()->json([
                'success' => false,
                'errors' => ['permission denied'],
            ]);
        }
    }
    $events = Event::with(['category', 'participants', 'organizer'])
        ->withCount('participants')
        ->get();

    $registeredEvents = $events->filter(function ($event) use ($user) {
        return $event->participants->contains($user->id);
    });

    return response()->json([
        'success' => true,
        'data' => ['items' => $registeredEvents],
    ]);
}

}