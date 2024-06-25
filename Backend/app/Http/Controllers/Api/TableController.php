<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\TableImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TableResource;

class TableController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'restaurant_location_id' => 'required|exists:restaurant_locations,id',
            'number_of_chairs' => 'required|integer|min:1',
            'max_number_of_persons' => 'required|integer|min:1',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'extra_number_of_chairs' => 'nullable|integer|min:0',
            'status' => 'required|in:available,unavailable',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg',
        ]);

        $table = new Table($request->all());

        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('images', 'public');
            $table->cover = basename($coverPath);
        }

        $table->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $tableImage = new TableImage([
                    'table_id' => $table->id,
                    'image' => basename($imagePath),
                ]);
                $tableImage->save();
            }
        }

        return new TableResource($table->load('images'));
    }

    public function update(Request $request, Table $table)
    {
        $request->validate([
            'number_of_chairs' => 'integer|min:1',
            'max_number_of_persons' => 'integer|min:1',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg',
            'price' => 'numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'extra_number_of_chairs' => 'nullable|integer|min:0',
            'status' => 'in:available,unavailable',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg',
        ]);

        $table->fill($request->all());

        if ($request->hasFile('cover')) {
            if ($table->cover) {
                Storage::disk('public')->delete('images/' . $table->cover);
            }

            $coverPath = $request->file('cover')->store('images', 'public');
            $table->cover = basename($coverPath);
        }

        $table->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $tableImage = new TableImage([
                    'table_id' => $table->id,
                    'image' => basename($imagePath),
                ]);
                $tableImage->save();
            }
        }

        return new TableResource($table->load('images'));
    }
}
