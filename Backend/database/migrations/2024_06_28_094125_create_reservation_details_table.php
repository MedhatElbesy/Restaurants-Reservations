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
        Schema::create('reservation_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained('reservations')->references('id')->onUpdate('cascade')->onDelete('cascade');
            //$table->morphs('reservable');
            $table->foreignId('table_id')->constrained('tables')->references('id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('table_availability_id')->constrained('table_availabilities')->references('id')->onUpdate('cascade')->onDelete('cascade');
            $table->date('reservation_date');
            $table->time('reservation_time')->nullable();
            $table->decimal('amount', 10, 2);
            $table->integer('number_of_extra_chairs')->default(0);
            $table->integer('number_of_extra_childs_chairs')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_tables');
    }
};
