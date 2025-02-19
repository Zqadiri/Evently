<?php

namespace Database\Seeders;

use App\Enums\ROLE;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
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
        // $faker = Faker::create();

        // for ($i = 1; $i <= 10; $i++) {
        //     User::create([
        //         'full_name' => $faker->name,
        //         'email' => $faker->unique()->safeEmail,
        //         'email_verified_at' => now(),
        //         'password' => Hash::make('password'),
        //         'profile_picture' => $faker->imageUrl(200, 200, 'people'),
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ]);
        // }

        $users = [
            [
                'full_name' => 'Admin User',
                'email' => 'admin@admin.fr',
                'password' => env('APP_ENV') === 'prod' ? 'fnFPB3TzGWTBoLA' : 'admin',
                'role' => ROLE::ADMIN,
            ],
            [
                'full_name' => 'Regular User',
                'email' => 'user@user.fr',
                'password' => env('APP_ENV') === 'prod' ? 'nRapnRYRdxcE' : 'user',
                'role' => ROLE::USER,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']], // Search by email
                [
                    'full_name' => $userData['full_name'],
                    'password' => Hash::make($userData['password']), // Hash the password
                ]
            );

            // Assign the role
            $user->assignRole($userData['role']);
        }
    }
}