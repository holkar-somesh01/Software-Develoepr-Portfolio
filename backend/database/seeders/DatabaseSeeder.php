<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ContactLead;
use App\Models\ConsultationLead;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create or update default Super Admin from environment config
        $adminEmail = config('portfolio.admin_email') ?: env('ADMIN_DEFAULT_EMAIL');
        $adminPassword = config('portfolio.admin_password') ?: env('ADMIN_DEFAULT_PASSWORD');
        $adminName = config('portfolio.owner_name') ?: env('ADMIN_DEFAULT_NAME', 'Administrator');

        if ($adminEmail && $adminPassword) {
            User::updateOrCreate(
                ['email' => $adminEmail],
                [
                    'name' => $adminName,
                    'password' => Hash::make($adminPassword),
                    'email_verified_at' => now(),
                ]
            );
        }

        // Seed sample contact leads
        if (ContactLead::count() === 0) {
            ContactLead::create([
                'name' => 'Aditya Sharma',
                'email' => 'aditya.sharma@example.com',
                'phone' => '+91 98765 43210',
                'subject' => 'Dynamic Web Application Quotation',
                'message' => 'Hello Someshwar, I saw your portfolio and would like to build an enterprise fleet management web dashboard for our logistics company. Please let me know your availability for a call.',
                'status' => 'new',
                'ip_address' => '127.0.0.1',
            ]);

            ContactLead::create([
                'name' => 'Rohit Verma',
                'email' => 'rohit.v@techcorp.in',
                'phone' => '+91 91234 56789',
                'subject' => 'School Portal Redesign',
                'message' => 'Loved the Jai Baba Ji Gurukul website work. We have a similar institution in Pune and want to modernize our admission portal.',
                'status' => 'contacted',
                'notes' => 'Sent initial proposal and scheduling meeting for Thursday.',
                'ip_address' => '127.0.0.1',
            ]);
        }

        // Seed sample consultation leads
        if (ConsultationLead::count() === 0) {
            ConsultationLead::create([
                'name' => 'Pooja Kulkarni',
                'email' => 'pooja.k@startup.io',
                'phone' => '+91 99887 76655',
                'project_type' => 'SaaS Platform',
                'budget' => '₹25K - ₹50K',
                'timeline' => '2-4 Weeks',
                'details' => 'We need an MVP for an Ayurvedic doctor appointment booking system with automated reminders and prescription downloads.',
                'status' => 'new',
                'ip_address' => '127.0.0.1',
            ]);
        }
    }
}
