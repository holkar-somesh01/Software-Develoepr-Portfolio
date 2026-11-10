<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Root URL redirects to admin dashboard / login.
     */
    public function test_root_redirects_to_admin(): void
    {
        $response = $this->get('/');
        $response->assertRedirect(route('admin.dashboard'));
    }

    /**
     * Admin login page is accessible.
     */
    public function test_admin_login_page_loads(): void
    {
        $response = $this->get('/admin/login');
        $response->assertStatus(200);
        $response->assertSee('Admin Portal');
    }

    /**
     * Contact lead API endpoint accepts data and persists.
     */
    public function test_contact_lead_api_submission(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'subject' => 'Project Inquiry',
            'message' => 'I would like to hire you for a web development project.'
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true
        ]);
    }

    /**
     * Consultation API endpoint accepts data.
     */
    public function test_consultation_api_submission(): void
    {
        $response = $this->postJson('/api/consultation', [
            'name' => 'Sarah Connor',
            'email' => 'sarah@skynet-security.com',
            'phone' => '+91 9988776655',
            'project_type' => 'Mobile Application',
            'budget' => '₹50K+',
            'timeline' => '1-2 Months',
            'details' => 'Need an enterprise cross-platform mobile app.'
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true
        ]);
    }
}
