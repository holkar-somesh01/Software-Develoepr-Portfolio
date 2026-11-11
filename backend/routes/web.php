<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;

// Redirect root to admin dashboard (or login if unauthenticated)
Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

// Standard login redirect to admin login
Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

// Admin Authentication Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    // Secure Admin Protected Routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Contact Leads
        Route::get('/leads', [AdminDashboardController::class, 'contactLeads'])->name('leads.index');
        Route::post('/leads/{id}/update', [AdminDashboardController::class, 'updateContactLead'])->name('leads.update');
        Route::post('/leads/{id}/send-email', [AdminDashboardController::class, 'sendContactEmail'])->name('leads.send-email');
        Route::delete('/leads/{id}', [AdminDashboardController::class, 'deleteContactLead'])->name('leads.delete');
        Route::get('/leads/export', [AdminDashboardController::class, 'exportLeads'])->name('leads.export');

        // Consultation Bookings
        Route::get('/consultations', [AdminDashboardController::class, 'consultations'])->name('consultations.index');
        Route::post('/consultations/{id}/update', [AdminDashboardController::class, 'updateConsultation'])->name('consultations.update');
        Route::post('/consultations/{id}/send-email', [AdminDashboardController::class, 'sendConsultationEmail'])->name('consultations.send-email');
        Route::delete('/consultations/{id}', [AdminDashboardController::class, 'deleteConsultation'])->name('consultations.delete');

        // Admin Security Profile & Mail Testing
        Route::get('/profile', [AdminDashboardController::class, 'profile'])->name('profile');
        Route::post('/profile', [AdminDashboardController::class, 'updateProfile'])->name('profile.update');
        Route::post('/email/test', [AdminDashboardController::class, 'sendTestEmail'])->name('email.test');
    });
});
