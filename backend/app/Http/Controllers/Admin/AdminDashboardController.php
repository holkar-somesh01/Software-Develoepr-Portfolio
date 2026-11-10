<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactLead;
use App\Models\ConsultationLead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminDashboardController extends Controller
{
    /**
     * Dashboard overview with high-level statistics and activity.
     */
    public function index()
    {
        $totalContactLeads = ContactLead::count();
        $newContactLeads = ContactLead::where('status', 'new')->count();
        $totalConsultations = ConsultationLead::count();
        $newConsultations = ConsultationLead::where('status', 'new')->count();

        $recentContactLeads = ContactLead::recent()->take(5)->get();
        $recentConsultations = ConsultationLead::recent()->take(5)->get();

        $leadsByStatus = [
            'new' => ContactLead::where('status', 'new')->count(),
            'contacted' => ContactLead::where('status', 'contacted')->count(),
            'in_progress' => ContactLead::where('status', 'in_progress')->count(),
            'converted' => ContactLead::where('status', 'converted')->count(),
            'archived' => ContactLead::where('status', 'archived')->count(),
        ];

        return view('admin.dashboard', compact(
            'totalContactLeads',
            'newContactLeads',
            'totalConsultations',
            'newConsultations',
            'recentContactLeads',
            'recentConsultations',
            'leadsByStatus'
        ));
    }

    /**
     * List all Contact Queries & Leads with filter and search.
     */
    public function contactLeads(Request $request)
    {
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        $query = ContactLead::query();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $leads = $query->recent()->paginate(15)->withQueryString();

        $statusCounts = [
            'all' => ContactLead::count(),
            'new' => ContactLead::where('status', 'new')->count(),
            'contacted' => ContactLead::where('status', 'contacted')->count(),
            'in_progress' => ContactLead::where('status', 'in_progress')->count(),
            'converted' => ContactLead::where('status', 'converted')->count(),
            'archived' => ContactLead::where('status', 'archived')->count(),
        ];

        return view('admin.leads.index', compact('leads', 'status', 'search', 'statusCounts'));
    }

    /**
     * Update Contact Lead status and notes.
     */
    public function updateContactLead(Request $request, $id)
    {
        $lead = ContactLead::findOrFail($id);

        $request->validate([
            'status' => 'required|in:new,contacted,in_progress,converted,archived',
            'notes' => 'nullable|string|max:2000',
        ]);

        $lead->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return back()->with('success', 'Lead #' . $lead->id . ' updated successfully.');
    }

    /**
     * Delete a contact lead.
     */
    public function deleteContactLead($id)
    {
        $lead = ContactLead::findOrFail($id);
        $lead->delete();

        return back()->with('success', 'Contact lead deleted successfully.');
    }

    /**
     * List Consultation / Hire Me bookings.
     */
    public function consultations(Request $request)
    {
        $status = $request->query('status', 'all');
        $search = $request->query('search', '');

        $query = ConsultationLead::query();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('project_type', 'like', "%{$search}%")
                  ->orWhere('details', 'like', "%{$search}%");
            });
        }

        $consultations = $query->recent()->paginate(15)->withQueryString();

        $statusCounts = [
            'all' => ConsultationLead::count(),
            'new' => ConsultationLead::where('status', 'new')->count(),
            'contacted' => ConsultationLead::where('status', 'contacted')->count(),
            'in_progress' => ConsultationLead::where('status', 'in_progress')->count(),
            'converted' => ConsultationLead::where('status', 'converted')->count(),
            'archived' => ConsultationLead::where('status', 'archived')->count(),
        ];

        return view('admin.consultations.index', compact('consultations', 'status', 'search', 'statusCounts'));
    }

    /**
     * Update Consultation status & notes.
     */
    public function updateConsultation(Request $request, $id)
    {
        $consultation = ConsultationLead::findOrFail($id);

        $request->validate([
            'status' => 'required|in:new,contacted,in_progress,converted,archived',
            'notes' => 'nullable|string|max:2000',
        ]);

        $consultation->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return back()->with('success', 'Consultation inquiry updated.');
    }

    /**
     * Delete a consultation lead.
     */
    public function deleteConsultation($id)
    {
        $consultation = ConsultationLead::findOrFail($id);
        $consultation->delete();

        return back()->with('success', 'Consultation record deleted.');
    }

    /**
     * Export all contact leads as CSV.
     */
    public function exportLeads(): StreamedResponse
    {
        $fileName = 'portfolio_leads_' . date('Y-m-d_H-i-s') . '.csv';
        $leads = ContactLead::recent()->get();

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename={$fileName}",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $callback = function () use ($leads) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Notes', 'IP Address', 'Created At']);

            foreach ($leads as $lead) {
                fputcsv($file, [
                    $lead->id,
                    $lead->name,
                    $lead->email,
                    $lead->phone ?? 'N/A',
                    $lead->subject,
                    $lead->message,
                    $lead->status,
                    $lead->notes ?? '',
                    $lead->ip_address,
                    $lead->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Admin Profile and Password Settings.
     */
    public function profile()
    {
        $user = Auth::user();
        return view('admin.profile', compact('user'));
    }

    /**
     * Update Admin Password or Name.
     */
    public function updateProfile(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'current_password' => 'nullable|required_with:new_password',
            'new_password' => 'nullable|min:8|confirmed',
        ]);

        if ($request->filled('new_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'The provided current password is incorrect.']);
            }
            $user->password = Hash::make($request->new_password);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return back()->with('success', 'Profile and security credentials updated successfully.');
    }
}

