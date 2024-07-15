<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Table\StoreTableRequest;
use App\Http\Requests\Table\UpdateTableRequest;
use App\Http\Resources\TableResource;
use App\Models\RestaurantLocation;
use App\Models\Table;
use App\Traits\UploadImageTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class TableController extends Controller
{
    use UploadImageTrait;

    public function index()
    {
        $tables = Table::with('images')->get();
        return TableResource::collection($tables);
    }

    public function store(StoreTableRequest $request)
    {

        $data = $request->all();

        if ($request->hasFile('cover')) {
            $coverPath = $this->uploadImage($request, 'cover', 'table_cover_images');
            $data['cover'] = $coverPath;
        }

        $table = Table::create($data);

        return ApiResponse::sendResponse(201, 'Table created successfully', new TableResource($table));
    }

    public function show( $restaurantLocationId)
    {
        try {
            $tables = Table::with('images')->where('restaurant_location_id', $restaurantLocationId)->get();

            if ($tables->isEmpty()) {
                return ApiResponse::sendResponse(404,'No tables found for the given restaurant location');
            }
        return ApiResponse::sendResponse(200, 'Tables with images', TableResource::collection($tables));
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(500, 'An error occurred while retrieving tables',  $e->getMessage());
        }
    }


    public function update(UpdateTableRequest $request, Table $table)
    {
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
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete table', ['error' => $e->getMessage()]);
        }
    }
}
