<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;



class EventParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $events = Event::all();
        $users = User::all();

        // attach 3 to 5 random participants
        $events->each(function ($event) use ($users, $faker) {
            $participants = $users->random($faker->numberBetween(1, 1))->pluck('id')->toArray();
            $event->participants()->attach($participants);
        });
    }
}
