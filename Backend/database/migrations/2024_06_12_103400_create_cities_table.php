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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name')->unique();
            $table->foreignId('governorate_id')
                ->constrained('governorates')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->enum('status' , [ItemStatus::Pending , ItemStatus::Enabled , ItemStatus::Disabled , ItemStatus::Deleted])->default(ItemStatus::Enabled)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
