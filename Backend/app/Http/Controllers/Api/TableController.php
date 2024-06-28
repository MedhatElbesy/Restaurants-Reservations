<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use App\Traits\UploadImageTrait;
use Illuminate\Http\Request;
use App\Http\Resources\TableResource;
use App\Helpers\ApiResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TableController extends Controller
{
    use UploadImageTrait;

    public function index()
    {
        return TableResource::collection(Table::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'restaurant_location_id' => 'required|integer',
            'number_of_chairs' => 'required|integer',
            'max_number_of_persons' => 'required|integer',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric',
            'sale_price' => 'nullable|numeric',
            'extra_number_of_chairs' => 'nullable|integer',
            'extra_number_of_childs_chairs' => 'nullable|integer',
            'status' => 'required|in:Available,Unavailable',
        ]);

        $data = $request->all();

        if ($request->hasFile('cover')) {
            $coverPath = $this->uploadImage($request, 'cover', 'table_cover_images');
            $data['cover'] = $coverPath;
        }

        $table = Table::create($data);

        return ApiResponse::sendResponse(201, 'Table created successfully', new TableResource($table));
    }

    public function show(Table $table)
    {
        return new TableResource($table);
    }

    public function update(Request $request, Table $table)
    {
        $request->validate([
            'restaurant_location_id' => 'nullable|integer',
            'number_of_chairs' => 'nullable|integer',
            'max_number_of_persons' => 'nullable|integer',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'nullable|numeric',
            'sale_price' => 'nullable|numeric',
            'extra_number_of_chairs' => 'nullable|integer',
            'extra_number_of_childs_chairs' => 'nullable|integer',
            'status' => 'nullable|in:Available,Unavailable',
        ]);

        $data = $request->all();

        DB::beginTransaction();
        try {
            if ($request->hasFile('cover')) {
                Storage::disk('public')->delete('table_cover_images/' . $table->cover);
                $coverPath = $this->uploadImage($request, 'cover', 'table_cover_images');
                $data['cover'] = $coverPath;
            }

            $table->update($data);

            DB::commit();
            return ApiResponse::sendResponse(200, 'Table updated successfully', new TableResource($table));
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to update table', ['error' => $e->getMessage()]);
        }
    }

    public function destroy(Table $table)
    {
        DB::beginTransaction();
        try {
            Storage::disk('public')->delete('table_cover_images/' . $table->cover);
            $table->delete();

            DB::commit();
            return ApiResponse::sendResponse(204,"Successfully Deleted");
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete table', ['error' => $e->getMessage()]);
        }
    }
}
