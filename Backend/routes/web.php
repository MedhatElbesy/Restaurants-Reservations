<?php

use App\Http\Controllers\Api\StripePaymentController;
use App\Http\Controllers\PayPalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pusher', function () {
    return view('pu');
});

// Route::get('paypal', [PayPalController::class, 'index'])->name('paypal');
Route::get('payment', [PayPalController::class, 'payment'])->name('payment');
Route::get('cancel', [PayPalController::class, 'paymentCancel'])->name('payment.cancel');
Route::get('payment/success', [PayPalController::class, 'paymentSuccess'])->name('payment.success');





Route::controller(StripePaymentController::class)->group(function(){
    Route::get('stripe', 'stripe')->name('stripe.index');

    Route::get('stripe/checkout', 'stripeCheckout')->name('stripe.checkout');

    Route::get('stripe/checkout/success', 'stripeCheckoutSuccess')->name('stripe.checkout.success');
});
