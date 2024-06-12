<?php

use App\Enums\ItemStatus;
use App\Enums\UserStatus;
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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('address')->nullable();
            $table->unsignedBigInteger('country_id');
            $table->unsignedBigInteger('governorate_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('state_id');
            $table->integer('zip')->nullable();
            $table->integer('latitude')->nullable();
            $table->integer('longitude')->nullable();
            $table->enum('status', [ItemStatus::Enabled, ItemStatus::Disabled, ItemStatus::Deleted])->default(ItemStatus::Enabled);

            $table->foreign('user_id')->on('users')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('country_id')->on('countries')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('governorate_id')->on('users')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('city_id')->on('cities')->cascadeOnDelete()->cascadeOnDelete();
            $table->foreign('state_id')->on('users')->cascadeOnDelete()->cascadeOnDelete();
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
