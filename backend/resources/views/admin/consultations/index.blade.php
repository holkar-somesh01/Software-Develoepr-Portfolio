@extends('admin.layouts.app')

@section('title', 'Consultation Bookings')
@section('page_title', 'Project Consultations & Hire Inquiries')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-white font-heading">Consultation & Hire Requests</h2>
            <p class="text-xs text-slate-400 mt-1">High-intent client requests for custom software, mobile apps, or enterprise solutions.</p>
        </div>
    </div>

    <!-- Filter Tabs & Search Bar -->
    <div class="glass-panel rounded-2xl p-4 space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <!-- Filter Tabs -->
            <div class="flex flex-wrap items-center gap-2">
                @php
                    $tabs = [
                        'all' => ['label' => 'All Requests', 'count' => $statusCounts['all']],
                        'new' => ['label' => 'New', 'count' => $statusCounts['new']],
                        'contacted' => ['label' => 'Contacted', 'count' => $statusCounts['contacted']],
                        'in_progress' => ['label' => 'In Discussion', 'count' => $statusCounts['in_progress']],
                        'converted' => ['label' => 'Booked / Won', 'count' => $statusCounts['converted']],
                        'archived' => ['label' => 'Archived', 'count' => $statusCounts['archived']],
                    ];
                @endphp

                @foreach($tabs as $tabKey => $tabData)
                    <a href="{{ route('admin.consultations.index', ['status' => $tabKey, 'search' => $search]) }}"
                       class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 {{ $status === $tabKey ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20' : 'bg-black/30 hover:bg-white/10 text-slate-300 border border-white/5' }}">
                        <span>{{ $tabData['label'] }}</span>
                        <span class="px-1.5 py-0.2 rounded-full text-[10px] {{ $status === $tabKey ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400' }}">
                            {{ $tabData['count'] }}
                        </span>
                    </a>
                @endforeach
            </div>

            <!-- Search Form -->
            <form method="GET" action="{{ route('admin.consultations.index') }}" class="flex items-center gap-2">
                <input type="hidden" name="status" value="{{ $status }}">
                <div class="relative">
                    <input type="text" name="search" value="{{ $search }}" placeholder="Search client, phone, details..."
                           class="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors">
                    <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                @if($search)
                    <a href="{{ route('admin.consultations.index', ['status' => $status]) }}" class="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs" title="Clear search">✕</a>
                @endif
                <button type="submit" class="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs border border-purple-500/40 transition-colors">
                    Search
                </button>
            </form>
        </div>
    </div>

    <!-- Consultation Cards -->
    @if($consultations->isEmpty())
        <div class="glass-panel rounded-2xl p-12 text-center text-slate-400">
            <svg class="w-16 h-16 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <h3 class="text-lg font-bold text-white font-heading">No consultations found</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                @if($search)
                    No results match "{{ $search }}" with status "{{ $status }}".
                @else
                    No consultation bookings recorded in this tab category yet.
                @endif
            </p>
        </div>
    @else
        <div class="space-y-4">
            @foreach($consultations as $consult)
                <div class="glass-panel rounded-2xl p-5 md:p-6 border border-white/5 hover:border-purple-500/30 transition-all space-y-4">
                    <!-- Top Bar: Client & Meta -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-base font-heading">
                                {{ strtoupper(substr($consult->name, 0, 1)) }}
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold text-base text-white font-heading">{{ $consult->name }}</h4>
                                    <span class="text-[11px] text-slate-500 font-mono">#{{ $consult->id }}</span>
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                        {{ $consult->project_type ?? 'General' }}
                                    </span>
                                    @if(($consult->email_count ?? 0) > 0)
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1" title="Last emailed: {{ $consult->last_emailed_at?->format('M d, Y h:i A') }}">
                                            <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                            Emailed ({{ $consult->email_count }})
                                        </span>
                                    @endif
                                </div>
                                <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                                    <span class="text-purple-400 flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        {{ $consult->email }}
                                    </span>
                                    @if($consult->phone)
                                        <span>•</span>
                                        <a href="tel:{{ $consult->phone }}" class="text-emerald-400 hover:underline flex items-center gap-1">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                            {{ $consult->phone }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <!-- Date & Quick Contact -->
                        <div class="flex items-center gap-2 sm:self-auto self-end">
                            <span class="text-xs text-slate-400 font-mono hidden md:inline">
                                {{ $consult->created_at->format('M d, Y • h:i A') }}
                            </span>

                            @if($consult->phone)
                                <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $consult->phone) }}" target="_blank"
                                   class="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1">
                                    WhatsApp
                                </a>
                            @endif

                            <!-- Send Email Button -->
                            <button type="button"
                                    onclick="openConsultEmailModal({{ json_encode($consult) }})"
                                    class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                <span>Send Email</span>
                            </button>
                        </div>
                    </div>

                    <!-- Project Specifications Badge Bar -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Budget</span>
                            <span class="text-sm font-bold text-emerald-400 mt-0.5 block">{{ $consult->budget ?: 'Flexible / Not Specified' }}</span>
                        </div>
                        <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Expected Timeline</span>
                            <span class="text-sm font-bold text-cyan-400 mt-0.5 block">{{ $consult->timeline ?: 'Standard / Flexible' }}</span>
                        </div>
                        <div class="p-3 rounded-xl bg-black/40 border border-white/5">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Service Category</span>
                            <span class="text-sm font-bold text-purple-300 mt-0.5 block">{{ $consult->project_type ?: 'Custom Software' }}</span>
                        </div>
                    </div>

                    <!-- Client Project Details -->
                    @if($consult->details)
                        <div>
                            <div class="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Project Brief & Requirements</div>
                            <div class="text-sm text-slate-200 bg-black/20 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                                {{ $consult->details }}
                            </div>
                        </div>
                    @endif

                    <!-- Status Update & Admin Notes Form -->
                    <div class="pt-3 border-t border-white/5 bg-black/20 -mx-5 -mb-5 md:-mx-6 md:-mb-6 p-4 rounded-b-2xl">
                        <form method="POST" action="{{ route('admin.consultations.update', $consult->id) }}" class="space-y-3">
                            @csrf
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                                <!-- Status Selector -->
                                <div class="md:col-span-3">
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Consultation Status</label>
                                    <select name="status" class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500">
                                        <option value="new" {{ $consult->status === 'new' ? 'selected' : '' }}>🟣 New Request</option>
                                        <option value="contacted" {{ $consult->status === 'contacted' ? 'selected' : '' }}>💬 Call Scheduled / Contacted</option>
                                        <option value="in_progress" {{ $consult->status === 'in_progress' ? 'selected' : '' }}>⏳ Proposal Sent / Negotiating</option>
                                        <option value="converted" {{ $consult->status === 'converted' ? 'selected' : '' }}>🟢 Project Contract Signed</option>
                                        <option value="archived" {{ $consult->status === 'archived' ? 'selected' : '' }}>⚪ Archived</option>
                                    </select>
                                </div>

                                <!-- Internal Notes -->
                                <div class="md:col-span-6">
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Admin Internal Notes & Activity Log</label>
                                    <input type="text" name="notes" value="{{ $consult->notes }}" placeholder="Meeting link sent, proposal discussed, etc..."
                                           class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500">
                                </div>

                                <!-- Action Buttons -->
                                <div class="md:col-span-3 flex items-center gap-2">
                                    <button type="submit" class="flex-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all">
                                        Save Note
                                    </button>
                                    <button type="button" onclick="confirmDeleteConsult('{{ route('admin.consultations.delete', $consult->id) }}', '{{ $consult->id }}')" class="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors" title="Delete consultation">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            @endforeach

            <!-- Pagination -->
            <div class="pt-4">
                {{ $consultations->links() }}
            </div>
        </div>
    @endif
</div>

<!-- ============================================================ -->
<!-- Send Email Composer Modal for Consultations -->
<!-- ============================================================ -->
<div id="consultEmailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md hidden">
    <div class="relative w-full max-w-2xl bg-[#12121c] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="p-5 border-b border-white/10 bg-gradient-to-r from-purple-950/40 via-pink-950/20 to-black/60 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                    <h3 class="font-heading font-bold text-base text-white">Send Email to Consultation Client</h3>
                    <p class="text-xs text-slate-400" id="consultModalInfo">Direct transmission via system SMTP</p>
                </div>
            </div>
            <button onclick="closeConsultEmailModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                ✕
            </button>
        </div>

        <!-- Modal Form Body -->
        <form id="consultEmailForm" method="POST" action="" class="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            @csrf

            <!-- Recipient Display -->
            <div class="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div class="text-xs text-slate-400">
                    To: <span id="consultModalTo" class="font-bold text-white"></span>
                </div>
                <div class="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    From: {{ config('mail.from.address', 'someshwarsholkar22@gmail.com') }}
                </div>
            </div>

            <!-- Quick Template Selector -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    ⚡ Use Consultation Email Template
                </label>
                <select id="consultTemplateSelector" onchange="applyConsultTemplate()" class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500">
                    <option value="call">1. Strategy & Discovery Call Scheduling</option>
                    <option value="proposal">2. Project Proposal & Scope Breakdown</option>
                    <option value="budget">3. Budget & Timeline Confirmation</option>
                    <option value="custom">4. Empty Custom Draft</option>
                </select>
            </div>

            <!-- Subject -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Subject</label>
                <input type="text" id="consultEmailSubject" name="subject" required
                       class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors">
            </div>

            <!-- Message Body -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Body Content</label>
                <textarea id="consultEmailMessage" name="message" rows="8" required
                          class="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors font-sans leading-relaxed"></textarea>
            </div>

            <!-- Auto Update Pipeline Status -->
            <div class="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                    <label class="text-xs font-bold text-white block">Auto-update Status to:</label>
                    <span class="text-[11px] text-slate-400">Updates consultation status and logs date in notes.</span>
                </div>
                <select name="update_status" class="px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500">
                    <option value="contacted" selected>💬 Call Scheduled / Contacted</option>
                    <option value="in_progress">⏳ Proposal Sent</option>
                    <option value="converted">🟢 Contract Signed</option>
                    <option value="">(Keep Current Status)</option>
                </select>
            </div>

            <!-- Footer Actions -->
            <div class="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                <button type="button" onclick="closeConsultEmailModal()" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold">
                    Cancel
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    <span>Send Consultation Email</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Delete Form Helper -->
<form id="deleteConsultForm" method="POST" action="" class="hidden">
    @csrf
    @method('DELETE')
</form>

<script>
    let activeConsult = null;

    function openConsultEmailModal(consult) {
        activeConsult = consult;
        const modal = document.getElementById('consultEmailModal');
        const form = document.getElementById('consultEmailForm');
        form.action = `/admin/consultations/${consult.id}/send-email`;

        document.getElementById('consultModalTo').innerText = `${consult.name} <${consult.email}>`;
        document.getElementById('consultModalInfo').innerText = `Project: ${consult.project_type || 'Software Consultation'} (Budget: ${consult.budget || 'Flexible'})`;

        document.getElementById('consultTemplateSelector').value = 'call';
        applyConsultTemplate();

        modal.classList.remove('hidden');
    }

    function closeConsultEmailModal() {
        document.getElementById('consultEmailModal').classList.add('hidden');
    }

    function applyConsultTemplate() {
        if (!activeConsult) return;

        const val = document.getElementById('consultTemplateSelector').value;
        const subjectInput = document.getElementById('consultEmailSubject');
        const messageInput = document.getElementById('consultEmailMessage');
        const proj = activeConsult.project_type || 'your project';

        if (val === 'call') {
            subjectInput.value = `Strategy Call: ${proj} Consultation — Someshwar Holkar`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for requesting a project consultation for ${proj}.

I've reviewed your brief:
• Budget: ${activeConsult.budget || 'Flexible'}
• Timeline: ${activeConsult.timeline || 'Flexible'}
${activeConsult.details ? `• Details: "${activeConsult.details}"` : ''}

I would love to jump on a quick 15-minute video call to outline technical architecture, milestones, and deliverable timelines.

Are you available for a brief call tomorrow or day after? Please let me know what time works best for you.

Best regards,
Someshwar Holkar
Full-Stack Software Developer
Phone / WhatsApp: +91 84828 16761`;
        } else if (val === 'proposal') {
            subjectInput.value = `Proposal & Architecture Overview for ${proj}`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for your interest in hiring me for ${proj}.

I have outlined an initial project roadmap and architecture proposal designed to meet your target timeline (${activeConsult.timeline || 'standard'}).

Could you please confirm if you have any third-party APIs, database preferences, or existing repositories we need to integrate?

I look forward to finalizing the project scope with you.

Warm regards,
Someshwar Holkar
+91 84828 16761`;
        } else if (val === 'budget') {
            subjectInput.value = `Budget & Milestone Confirmation — ${proj}`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for sharing your project specifications.

Regarding the ${activeConsult.budget || 'discussed'} budget and timeline, I can accommodate the core deliverables within this framework by structuring development into 2 milestones:

1. Milestone 1: Core Architecture, Database Schema, and UI Flow
2. Milestone 2: Business Logic, Integration, Testing & Deployment

Let me know if this aligns with your expectations so we can get started!

Best regards,
Someshwar Holkar`;
        } else {
            subjectInput.value = `Regarding your consultation for ${proj}`;
            messageInput.value = `Hi ${activeConsult.name},

`;
        }
    }

    function confirmDeleteConsult(url, id) {
        if (confirm(`Are you sure you want to delete consultation #${id}?`)) {
            const form = document.getElementById('deleteConsultForm');
            form.action = url;
            form.submit();
        }
    }
</script>
@endsection
