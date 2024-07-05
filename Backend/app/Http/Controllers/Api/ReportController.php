<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Models\Report;
use Exception;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{

public function show(){
        $report = Report::all();
        if(!$report){
            return ApiResponse::sendResponse(500, "Error",);
        }
        return ApiResponse::sendResponse(200, "All Report", $report);
    }
    function index(){
        $reports = Report::all();
        if(!$reports){
            return ApiResponse::sendResponse(500,"No Reports");
        }
            return ApiResponse::sendResponse(200,"All Reports ", $reports);
    }
    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();
        $auth_user = Auth::guard('sanctum')->user();
        $data['user_id'] = $auth_user->id;

        try {
            $validatedData =Report::create($data);
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
