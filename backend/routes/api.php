<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeadApiController;

/*
|--------------------------------------------------------------------------
| API Routes for Portfolio Frontend Integration
|--------------------------------------------------------------------------
*/

Route::get('/health', [LeadApiController::class, 'health']);

// Public Lead capture endpoints with rate limiting
Route::middleware(['throttle:30,1'])->group(function () {
    Route::post('/contact', [LeadApiController::class, 'submitContact']);
    Route::post('/consultation', [LeadApiController::class, 'submitConsultation']);
});

