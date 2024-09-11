<?php
namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\UploadImageTrait;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Exception;

class RegisterController extends Controller
{
    //This is Nagy and i edited here
    use UploadImageTrait;
    public function __construct()
    {
        /* $this->middleware(['auth:sanctum , verified:sanctum'])->except('store','create_access_token' , 'show' ,'userActivation');*/
    }

    public function register(StoreUserRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $data = $request->except('_token');

            if ($request->hasFile('profile_image')) {
                $data['profile_image'] = $this->uploadImage($request, 'profile_image', 'profile_images');
            }
            $user = User::create($data);

            $token = 123456;
            DB::table('user_activations')->insert([
                'user_id' => $user->id,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);

            Mail::send('emails.activation', ['user' => $user, 'token' => $token], function ($message) use ($user) {
                $message->from('noreply@example.com', config('app.name'));
                $message->to($user['email']);
                $message->subject('Email Verification');
            });

            DB::commit();

            return ApiResponse::sendResponse(201,
                'Account created successfully! A verification code has been sent to your email', new UserResource($user));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error in RegisterController@register: '.$e->getMessage());

            return ApiResponse::sendResponse(500,'Failed to create account. Please try again later.');
        }
    }
}
