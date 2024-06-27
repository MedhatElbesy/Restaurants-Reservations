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
        Schema::create('restaurant_location_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_location_id')->constrained('restaurant_locations')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('comment_id')->constrained('comments')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurant_location_comments');
    }
};
