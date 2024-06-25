<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResturantImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResturantImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = ResturantImages::all();
        return response()->json($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'image' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images/restaurant_images/', 'public');

            $resturantImage = ResturantImages::create([
                'restaurant_id' => $request->input('restaurant_id'),
                'image' => $imagePath,
            ]);

            return response()->json($resturantImage, 201);
        }

        return response()->json(['error' => 'Image upload failed'], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = ResturantImages::find($id);
        if ($image) {
            return response()->json($image);
        }
        return response()->json(['error' => 'Image not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $image = ResturantImages::find($id);
        if (!$image) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($image->image);

            // Store the new image
            $newImage = $request->file('image');
            $newImagePath = $newImage->store('images/restaurant_images/', 'public');

            $image->update([
                'image' => $newImagePath,
            ]);
        }

        return response()->json($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = ResturantImages::find($id);
        if (!$image) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        // Delete the image file
        Storage::disk('public')->delete($image->image);

        $image->delete();
        return response()->json(['message' => 'Image deleted successfully']);
    }
}
