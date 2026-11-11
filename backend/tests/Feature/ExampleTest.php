<?php

namespace Tests\Feature;

use App\Mail\AdminDirectReplyMail;
use App\Models\ContactLead;
use App\Models\ConsultationLead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
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
        Mail::fake();

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

        $this->assertDatabaseHas('contact_leads', [
            'email' => 'john.doe@example.com',
            'status' => 'new'
        ]);
    }

    /**
     * Consultation API endpoint accepts data.
     */
    public function test_consultation_api_submission(): void
    {
        Mail::fake();

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

        $this->assertDatabaseHas('consultation_leads', [
            'email' => 'sarah@skynet-security.com',
            'status' => 'new'
        ]);
    }

    /**
     * Admin can send email to a contact lead directly from admin panel.
     */
    public function test_admin_can_send_email_to_contact_lead(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $lead = ContactLead::create([
            'name' => 'Michael Scott',
            'email' => 'michael@dundermifflin.com',
            'subject' => 'Paper Website Redesign',
            'message' => 'We need a modern website with client ordering.',
            'status' => 'new',
        ]);

        $response = $this->actingAs($user)->post(route('admin.leads.send-email', $lead->id), [
            'subject' => 'Re: Paper Website Redesign',
            'message' => 'Hi Michael, I would love to build your new website.',
            'update_status' => 'contacted',
        ]);

        $response->assertSessionHas('success');

        Mail::assertSent(AdminDirectReplyMail::class, function ($mail) use ($lead) {
            return $mail->hasTo($lead->email) &&
                   $mail->mailSubject === 'Re: Paper Website Redesign';
        });

        $lead->refresh();
        $this->assertEquals('contacted', $lead->status);
        $this->assertEquals(1, $lead->email_count);
        $this->assertNotNull($lead->last_emailed_at);
        $this->assertStringContainsString('Re: Paper Website Redesign', $lead->notes);
    }

    /**
     * Admin can send email to a consultation booking client.
     */
    public function test_admin_can_send_email_to_consultation_lead(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $consult = ConsultationLead::create([
            'name' => 'Pam Beesly',
            'email' => 'pam@artportfolio.org',
            'phone' => '+1 555-0199',
            'project_type' => 'Portfolio Website',
            'budget' => '₹25K - ₹50K',
            'timeline' => '1 Month',
            'details' => 'Art gallery portfolio website.',
            'status' => 'new',
        ]);

        $response = $this->actingAs($user)->post(route('admin.consultations.send-email', $consult->id), [
            'subject' => 'Consultation Call Schedule',
            'message' => 'Hi Pam, let us schedule a strategy call.',
            'update_status' => 'in_progress',
        ]);

        $response->assertSessionHas('success');

        Mail::assertSent(AdminDirectReplyMail::class, function ($mail) use ($consult) {
            return $mail->hasTo($consult->email) &&
                   $mail->mailSubject === 'Consultation Call Schedule';
        });

        $consult->refresh();
        $this->assertEquals('in_progress', $consult->status);
        $this->assertEquals(1, $consult->email_count);
        $this->assertNotNull($consult->last_emailed_at);
    }
}
