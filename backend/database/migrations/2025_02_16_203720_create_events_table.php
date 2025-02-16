<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
/**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->dateTime('date');
            $table->string('location');
            $table->text('description')->nullable();
            $table->unsignedInteger('max_participants');
            $table->unsignedBigInteger('organizer_id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->timestamps();
        
            $table->foreign('organizer_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        
            $table->foreign('category_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('set null'); // Set category to null if the category is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
