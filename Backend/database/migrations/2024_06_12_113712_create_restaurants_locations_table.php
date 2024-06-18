<?php

use App\Enums\ItemStatus;
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
        Schema::create('restaurant_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')
                ->constrained('restaurants')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('address')->nullable();
            $table->unsignedBigInteger('country_id');
            $table->unsignedBigInteger('governorate_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('state_id');
            $table->integer('zip')->nullable();
            $table->integer('latitude')->nullable();
            $table->integer('longitude')->nullable();
            $table->time('opening_time')->nullable();
            $table->time('closed_time')->nullable();
            $table->text('closed_days')->nullable(); //array
            $table->integer('number_of_tables')->default(0);
            $table->string('phone_number')->nullable()->unique();
            $table->string('mobile_number')->nullable()->unique();
            $table->string('hot_line')->nullable()->unique();
            $table->enum('status', [ItemStatus::Opened, ItemStatus::Closed])->default(ItemStatus::Opened);

            $table->foreign('country_id')->references('id')->on('countries')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('city_id')->references('id')->on('cities')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('governorate_id')->references('id')->on('governorates')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('state_id')->references('id')->on('states')->cascadeOnDelete()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resturant_locations');
    }
};
