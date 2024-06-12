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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('table_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('restaurant_location_id');
            $table->decimal('amount', 10, 2);
            $table->enum('payment_method', ['credit_card', 'cash', 'paypal', 'gateway']);
            $table->enum('status', [ItemStatus::Pending, ItemStatus::Success, ItemStatus::Failed])->default(ItemStatus::Pending);
            $table->string('transaction_id')->nullable();
            $table->decimal('tax', 10, 2);
            $table->timestamps();

            $table->foreign('table_id')->references('id')->on('tables')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('restaurant_location_id')->references('id')->on('restaurant_locations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
