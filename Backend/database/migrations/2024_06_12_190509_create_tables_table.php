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
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_location_id')
                ->constrained('restaurant_locations')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('number_of_chairs')->default(0);
            $table->integer('max_number_of_persons')->nullable(0);
            $table->string('cover')->nullable();
            $table->string('price', 10, 2)->default(0.00);
            $table->string('sale_price', 10, 2)->default(0.00);
            $table->integer('extra_number_of_chairs')->default(0);
            $table->integer('extra_number_of_childs_chairs')->default(0);
            $table->enum('status', [ItemStatus::Available, ItemStatus::Unavailable])->default(ItemStatus::Available)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
