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
            $table->foreignId('reservation_id')->constrained('reservations')->references('id')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->references('id')->on('users')->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->foreignId('gateway_id')->nullable()->constrained('gateways')->references('id')->on('gateways')->onDelete('cascade');
            $table->string('transaction_image')->nullable();
            $table->string('transaction_phone_number')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->enum('status', [ItemStatus::Pending, ItemStatus::Success, ItemStatus::Failed, ItemStatus::Rejected, ItemStatus::Confirmed, ItemStatus::Cancelled])->default(ItemStatus::Pending);
            $table->timestamps();
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
