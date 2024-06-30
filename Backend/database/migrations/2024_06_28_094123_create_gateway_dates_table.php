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
        Schema::create('gateway_dates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gateways_id')->constrained('gateways')->references('id')->onUpdate('cascade')->onDelete('cascade');;
            $table->string('key')->nullable();
            $table->string('secret_key')->nullable();
            $table->string('public_key')->nullable();
            $table->enum('status', [ItemStatus::Available, ItemStatus::Unavailable])->default(ItemStatus::Available);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gateway_dates');
    }
};
