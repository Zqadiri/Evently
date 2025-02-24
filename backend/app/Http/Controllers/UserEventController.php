<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class UserEventController extends Controller
{
    /**
     * Register a user for an event.
     */
    public function register(Request $request, $id)
    {
        // Log::debug('Request Data:', [
        //     'id' => $id,
        //     'user_id' => $request->input('userid'),
        // ]);
        // Log::debug('Full Request Body:', $request->all());

        $userId = $request->input('user_id');
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $eventId = $request->input('id');

        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->participatingEvents()->where('event_id', $request->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'User is already registered for this event.',
            ], 409);
        }

        $user->participatingEvents()->attach($eventId);

        return response()->json([
            'success' => true,
            'message' => 'User registered to event successfully.',
        ], 201);
    }


    /**
     * Unregister a user from an event.
     */
    public function unregister(Request $request, $eventId)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $userId = $request->input('user_id');

        $eventExists = DB::table('events')->where('id', $eventId)->exists();
        if (!$eventExists) {
            return response()->json([
                'message' => 'Event not found.',
            ], 404);
        }

        $deleted = DB::table('event_participant')
            ->where('user_id', $userId)
            ->where('event_id', $eventId)
            ->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'User successfully unregistered from the event.',
            ], 200);
        }

        return response()->json([
            'message' => 'User was not registered for this event.',
        ], 404);
    }
}
