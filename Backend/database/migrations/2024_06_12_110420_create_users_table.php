<?php

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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('mobile_number')->unique()->nullable();
            $table->string('password');
            $table->string('profile_image')->nullable();
            $table->enum('gender', ['female', 'male'])->nullable();
            $table->date('birth_date')->nullable();
            //$table->enum('role', ['user', 'business'])->default('user');
            $table->text('roles_name');
            $table->enum('status', [ UserStatus::Active, UserStatus::InActive, UserStatus::Blocked, UserStatus::Deleted])->default(UserStatus::Active);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('google_id')->nullable();
            $table->string('facebook_id')->nullable();
            $table->string('twitter_id')->nullable();
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
