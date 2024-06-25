<?php

namespace App\Http\Controllers;

use App\Models\TableImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TableImageResource;

class TableImageController extends Controller
{
    public function index($tableId)
    {
        $images = TableImage::where('table_id', $tableId)->get();
        return TableImageResource::collection($images);
    }

    // Store new images for a table
    public function store(Request $request, $tableId)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $images = [];

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('images', 'public');
            $tableImage = new TableImage([
                'table_id' => $tableId,
                'image' => basename($imagePath),
            ]);
            $tableImage->save();
            $images[] = $tableImage;
        }

        return TableImageResource::collection($images);
    }

    public function show($id)
    {
        $tableImage = TableImage::findOrFail($id);
        return new TableImageResource($tableImage);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $tableImage = TableImage::findOrFail($id);

        // Delete the old image
        Storage::disk('public')->delete('images/' . $tableImage->image);

        // Store the new image
        $imagePath = $request->file('image')->store('images', 'public');
        $tableImage->image = basename($imagePath);
        $tableImage->save();

        return new TableImageResource($tableImage);
    }

    public function destroy($id)
    {
        $tableImage = TableImage::findOrFail($id);
        Storage::disk('public')->delete('images/' . $tableImage->image);
        $tableImage->delete();

        return response()->json(['message' => 'Image deleted successfully.'], 200);
    }
}

