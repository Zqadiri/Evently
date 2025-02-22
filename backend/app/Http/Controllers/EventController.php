<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends CrudController
{
    protected $table = 'events';

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

        $events = Event::with(['category', 'participants', 'organizer'])
        ->withCount('participants')
        ->find($id);

        if (method_exists($this, 'afterReadAll')) {
            $this->afterReadAll($events);
        }

        return response()->json([
            'success' => true,
            'data' => ['items' => $events],
        ]);
    }
}