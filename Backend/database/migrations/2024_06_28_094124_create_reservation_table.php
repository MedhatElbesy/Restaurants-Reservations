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
        Schema::create('reservation', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //user id
            $table->foreignId('user_id')
                ->constrained('users')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            //table id
            $table->foreignId('table_id')
                ->constrained('tables')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // time for reservation
            $table->time('reservation_time');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};
