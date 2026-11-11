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
        Schema::table('contact_leads', function (Blueprint $table) {
            $table->timestamp('last_emailed_at')->nullable()->after('status');
            $table->unsignedInteger('email_count')->default(0)->after('last_emailed_at');
        });

        Schema::table('consultation_leads', function (Blueprint $table) {
            $table->timestamp('last_emailed_at')->nullable()->after('status');
            $table->unsignedInteger('email_count')->default(0)->after('last_emailed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_leads', function (Blueprint $table) {
            $table->dropColumn(['last_emailed_at', 'email_count']);
        });

        Schema::table('consultation_leads', function (Blueprint $table) {
            $table->dropColumn(['last_emailed_at', 'email_count']);
        });
    }
};
