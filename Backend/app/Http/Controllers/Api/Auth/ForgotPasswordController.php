<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Exception;

class ForgotPasswordController extends Controller
{
    // Forget password => user enter your email  and  using this function send email with unique code to reset password
    public function sendResetToken(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'email' => 'required|email|exists:users,email'
            ]);

            $token = rand(111111, 999999) * 111111;
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);

            Mail::send('emails.forget_password', ['email' => $request->email, 'token' => $token], function ($message) use ($request) {
                $message->from('noreply@example.com', config('app.name'));

                $message->to($request->email, 'Your Email : ');

                $message->subject('Forget password');
            });

            DB::commit();

            return ApiResponse::sendResponse(200, 'The password reset code has been sent to your email!');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error in RegisterController@register: ' . $e->getMessage());

            return ApiResponse::sendResponse(500, 'Failed to create account. Please try again later.');
        }
    }
}
