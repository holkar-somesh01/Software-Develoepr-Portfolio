<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactLead;
use App\Models\ConsultationLead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadApiController extends Controller
{
    /**
     * Submit a contact inquiry lead from portfolio contact forms.
     */
    public function submitContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|min:5|max:5000',
            'phone' => 'nullable|string|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $lead = ContactLead::create([
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject ?: 'General Portfolio Inquiry',
                'message' => $request->message,
                'phone' => $request->phone,
                'status' => 'new',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Your message has been received! I will review your inquiry and get back to you shortly.',
                'lead_id' => $lead->id,
                'created_at' => $lead->created_at->toIso8601String(),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save lead: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit a consultation booking inquiry from "Hire Me" modal.
     */
    public function submitConsultation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:30',
            'project_type' => 'nullable|string|max:100',
            'budget' => 'nullable|string|max:100',
            'timeline' => 'nullable|string|max:100',
            'details' => 'nullable|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $lead = ConsultationLead::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'project_type' => $request->project_type ?: 'General Consultation',
                'budget' => $request->budget ?: "Let's Discuss",
                'timeline' => $request->timeline ?: 'Flexible',
                'details' => $request->details,
                'status' => 'new',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Consultation request submitted successfully! Someshwar will contact you to schedule your session.',
                'lead_id' => $lead->id,
                'created_at' => $lead->created_at->toIso8601String(),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit consultation: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Health check endpoint.
     */
    public function health()
    {
        return response()->json([
            'status' => 'healthy',
            'service' => 'Someshwar Portfolio Backend API',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}

