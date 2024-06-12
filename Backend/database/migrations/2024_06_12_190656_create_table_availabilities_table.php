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
        Schema::create('table_availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')
                ->constrained('tables')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status', [ItemStatus::Available, ItemStatus::Unavailable])->default(ItemStatus::Available)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_availabilities');
    }
};
