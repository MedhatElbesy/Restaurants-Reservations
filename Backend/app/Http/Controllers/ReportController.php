<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Models\Report;
use Exception;

class ReportController extends Controller
{
    public function store(StoreReportRequest $request)
    {
        try {
            $validatedData =Report::create($request->validated());
            return ApiResponse::sendResponse(201,'Report created successfully',$validatedData);
        }catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create Report', ['error' => $e->getMessage()]);
        }
    }

    public function updateStatus(UpdateReportStatusRequest $request, $reportId)
{
    try {
        $validatedData = $request->validated();
        $report = Report::findOrFail($reportId);
        $report->status = $validatedData['new_status'];
        $report->save();
        return ApiResponse::sendResponse(200, 'Report status updated successfully', $report);

    } catch (Exception $e) {
        return ApiResponse::sendResponse(500, 'Failed to update report status', ['error' => $e->getMessage()]);
    }
}




}
