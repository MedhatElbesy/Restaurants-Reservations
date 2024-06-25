<?php
namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\RestaurantLocationImage;
use App\Traits\UploadImageTrait;
use Illuminate\Http\Request;

class RestaurantLocationImageController extends Controller
{
    use UploadImageTrait;

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $imagePath = $this->uploadImage($request, 'image', 'restaurant_images');

            if ($imagePath) {
                $image = RestaurantLocationImage::create([
                    'restaurant_location_id' => $request->input('restaurant_location_id'),
                    'image' => $imagePath,
                ]);

                return ApiResponse::sendResponse(201, 'Image uploaded successfully', $image);
            }

            return ApiResponse::sendResponse(400, 'Image upload failed');
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to upload image', ['error' => $e->getMessage()]);
        }
    }
}
