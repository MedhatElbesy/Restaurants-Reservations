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
        Schema::create('table_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')
                ->constrained('tables')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('image');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_images');
    }
};
