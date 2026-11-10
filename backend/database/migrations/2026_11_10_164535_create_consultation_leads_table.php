<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultation_leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('project_type')->nullable(); // Business Website, Mobile App, SaaS Platform, etc.
            $table->string('budget')->nullable();       // ₹5K - ₹10K, ₹10K - ₹25K, etc.
            $table->string('timeline')->nullable();     // Immediately, 1-2 Months, etc.
            $table->text('details')->nullable();
            $table->string('status')->default('new');   // new, contacted, in_progress, converted, archived
            $table->text('notes')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_leads');
    }
};
