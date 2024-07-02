<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTableAvailabilityRequest;
use App\Http\Requests\UpdateTableAvailabilityRequest;
use App\Models\TableAvailability;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TableAvailabilityController extends Controller
{


    function show($table_id){
        $availability = TableAvailability::where('table_id', $table_id)->get();

        if (!$availability) {
            return ApiResponse::sendResponse(404, 'Table availability not found for the given table_id.');
        }
        return ApiResponse::sendResponse(200, 'Table availability retrieved successfully.',$availability );
    }

    function showByTableAvailabilities($table_availabilities_id){
        $availability = TableAvailability::where('id', $table_availabilities_id)->get();

        if (!$availability) {
            return ApiResponse::sendResponse(404, 'Table availability not found for the given table_id.');
        }
        return ApiResponse::sendResponse(200, 'Table availability retrieved successfully.',$availability );
    }
    
    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreTableAvailabilityRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $tableAvailability = TableAvailability::create($validatedData);
            return ApiResponse::sendResponse(201, 'Table availability created successfully', $tableAvailability);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'An error occurred while creating table availability');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTableAvailabilityRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            $tableAvailability = TableAvailability::findOrFail($id);
            $tableAvailability->update($validatedData);
            return ApiResponse::sendResponse(200, 'Table availability updated successfully', $tableAvailability);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'An error occurred while updating table availability');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $tableAvailability = TableAvailability::findOrFail($id);
            $tableAvailability->delete();
            return ApiResponse::sendResponse(200, 'Table availability deleted successfully');
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'An error occurred while deleting table availability');
        }
    }
}
