<?php

namespace Database\Seeders;
use App\Models\Category;
use App\Models\Event;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;



class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = User::pluck('id')->toArray();

        $categoryIds = Category::pluck('id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            Event::create([
                'title' => $faker->sentence(2), // Random title
                'date' => $faker->dateTimeBetween('now', '+1 year'), // Random date within the next year
                'location' => $faker->city, // Random city
                'description' => $faker->paragraph, // Random description
                'max_participants' => $faker->numberBetween(10, 100), // Random number of participants
                'organizer_id' => $faker->randomElement($userIds), // Random organizer
                'category_id' => $faker->randomElement($categoryIds), // Random category
            ]);
        }
    }
}
