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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('title')->nullable();
            $table->text('summary')->nullable();
            $table->text('description')->nullable();
            $table->enum('rating',[0,1,2,3,4,5])->default(0);
            $table->string('hot_line')->nullable()->unique();
            $table->enum('status', [UserStatus::Active, UserStatus::InActive, UserStatus::Deleted])->default(UserStatus::Active);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
