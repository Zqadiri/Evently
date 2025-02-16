<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     *
     * @return void
     */

     
    public function run()
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'full_name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'profile_picture' => $faker->imageUrl(200, 200, 'people'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        //! test user
        User::create([
            'full_name' => 'Test User',
            'email' => 'test@test.com',
            'password' => Hash::make('test'),
            'profile_picture' => 'path/to/test_picture.jpg',
        ]);

    }
}