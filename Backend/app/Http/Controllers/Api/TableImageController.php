<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TableImage;
use App\Traits\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TableImageResource;
use App\Helpers\ApiResponse;

class TableImageController extends Controller
{
    use UploadImageTrait;

    public function index($tableId)
    {
        $images = TableImage::where('table_id', $tableId)->get();
        return TableImageResource::collection($images);
    }

    public function store(Request $request, $tableId)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $uploadedImages = $this->uploadMultipleImages($request->file('images'), 'table_images');
            $images = [];

            foreach ($uploadedImages as $imageName) {
                $tableImage = new TableImage([
                    'table_id' => $tableId,
                    'image' => $imageName,
                ]);
                $tableImage->save();
                $images[] = $tableImage;
            }

            DB::commit();
            return ApiResponse::sendResponse(201, 'Images uploaded successfully', TableImageResource::collection($images));
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to upload images', ['error' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        $tableImage = TableImage::findOrFail($id);
        return new TableImageResource($tableImage);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $tableImage = TableImage::findOrFail($id);

        DB::beginTransaction();
        try {
            Storage::disk('public')->delete('table_images/' . $tableImage->image);

            $imagePath = $this->uploadImage($request, 'image', 'table_cover_images');
            $tableImage->image = basename($imagePath);
            $tableImage->save();

            DB::commit();
            return ApiResponse::sendResponse(200, 'Image updated successfully', new TableImageResource($tableImage));
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to update image', ['error' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $tableImage = TableImage::findOrFail($id);

        DB::beginTransaction();
        try {
            Storage::disk('public')->delete('table_images/' . $tableImage->image);
            $tableImage->delete();

            DB::commit();
            return response()->json(['message' => 'Image deleted successfully.'], 200);
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete image', ['error' => $e->getMessage()]);
        }
    }
}
