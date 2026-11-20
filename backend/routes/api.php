<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadApiController;

/*
|--------------------------------------------------------------------------
| API Routes for Portfolio Frontend Integration
|--------------------------------------------------------------------------
*/

Route::get('/health', [LeadApiController::class, 'health']);

// Public Lead capture endpoints with strict rate limiting (max 6 requests per minute per IP to block spam bots)
Route::middleware(['throttle:6,1'])->group(function () {
    Route::post('/contact', [LeadApiController::class, 'submitContact']);
    Route::post('/consultation', [LeadApiController::class, 'submitConsultation']);
});

