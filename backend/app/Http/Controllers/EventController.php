<?php

namespace App\Http\Controllers;


use App\Models\Event;
use Log;

class EventController extends Controller
{
    // Fetch all events with their category and participants
    public function getAllEventsWithDetails()
    {
        $events = Event::with(['category', 'participants', 'organizer'])->get();
    
        // Format the events to match the frontend interface
        $formattedEvents = $events->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->date,
                'location' => $event->location,
                'description' => $event->description,
                'maxParticipants' => $event->max_participants,
                'organizer' => [
                    'id' => $event->organizer->id,
                    'fullName' => $event->organizer->full_name,
                    'email' => $event->organizer->email,
                    'profilePicture' => $event->organizer->profile_picture,
                ],
                'category' => [
                    'id' => $event->category->id,
                    'name' => $event->category->name,
                ],
                'participants' => $event->participants->map(function ($participant) {
                    return [
                        'id' => $participant->id,
                        'fullName' => $participant->full_name, // Use camelCase for frontend compatibility
                        'email' => $participant->email,
                        'profilePicture' => $participant->profile_picture, // Use camelCase for frontend compatibility
                    ];
                }),
            ];
        });
    
        return response()->json([
            'message' => 'Events retrieved successfully.',
            'data' => $formattedEvents,
        ]);
    }


    // public function addParticipants(Request $request, $eventId)
    // {
    //     $request->validate([
    //         'user_ids' => 'required|array', // Array of user IDs to add as participants
    //         'user_ids.*' => 'exists:users,id', // Ensure each user ID exists in the users table
    //     ]);

    //     $event = Event::findOrFail($eventId);

    //     $event->participants()->attach($request->user_ids);

    //     return response()->json([
    //         'message' => 'Participants added successfully.',
    //         'event' => $event,
    //     ]);
    // }
}
