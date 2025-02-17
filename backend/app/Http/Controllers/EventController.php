<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Fetch all events with their category and participants
    public function getAllEventsWithDetails(): JsonResponse
    {
        $events = Event::with(['category', 'participants', 'organizer'])->get();
        $formattedEvents = $this->formatEvents($events);

        return response()->json([
            'message' => 'Events retrieved successfully.',
            'data' => $formattedEvents,
        ]);
    }

    // Fetch events that belong to the specified category
    public function getEventsByCategory($categoryId): JsonResponse
    {
        $events = Event::with(['category', 'participants', 'organizer'])
            ->where('category_id', $categoryId)
            ->get();

        $formattedEvents = $this->formatEvents($events);

        return response()->json([
            'message' => 'Events retrieved successfully.',
            'data' => $formattedEvents,
        ]);
    }

    /**
     * Format events to match the frontend interface.
     *
     * @param \Illuminate\Database\Eloquent\Collection $events
     * @return array
     */
    private function formatEvents($events): array
    {
        return $events->map(function ($event) {
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
                        'fullName' => $participant->full_name,
                        'email' => $participant->email,
                        'profilePicture' => $participant->profile_picture,
                    ];
                }),
            ];
        })->toArray();
    }

    /**
     * Join an event.
     *
     * @param Request $request
     * @param int $eventId
     * @return JsonResponse
     */

    public function joinEvent(Request $request, $eventId): JsonResponse
    {
        // Ensure the user is authenticated
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized. Please log in to join the event.',
            ], 401);
        }

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'message' => 'Event not found.',
            ], 404);
        }

        //!! Check if the user is already a participant 
        if ($event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You are already a participant in this event.',
            ], 400);
        }

        // Check if the event has reached its maximum participants limit
        if ($event->participants()->count() >= $event->max_participants) {
            return response()->json([
                'message' => 'This event has reached its maximum number of participants.',
            ], 400);
        }

        $event->participants()->attach($user->id);

        return response()->json([
            'message' => 'You have successfully joined the event.',
            'data' => [
                'eventId' => $event->id,
                'eventTitle' => $event->title,
                'userId' => $user->id,
                'userEmail' => $user->email,
            ],
        ]);
    }
}