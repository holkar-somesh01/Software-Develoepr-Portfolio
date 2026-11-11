@extends('admin.layouts.app')

@section('title', 'Contact Queries')
@section('page_title', 'Contact Leads & Messages')

@section('content')
<div class="space-y-6">
    <!-- Header with Quick Export -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-white font-heading">Incoming Portfolio Leads</h2>
            <p class="text-xs text-slate-400 mt-1">Review inquiries, track pipeline status, and dispatch professional emails directly to clients.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('admin.leads.export') }}" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 font-semibold text-xs border border-white/10 transition-all flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Export CSV
            </a>
        </div>
    </div>

    <!-- Filter Tabs & Search Bar -->
    <div class="glass-panel rounded-2xl p-4 space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <!-- Filter Tabs -->
            <div class="flex flex-wrap items-center gap-2">
                @php
                    $tabs = [
                        'all' => ['label' => 'All Queries', 'count' => $statusCounts['all']],
                        'new' => ['label' => 'New', 'count' => $statusCounts['new']],
                        'contacted' => ['label' => 'Contacted', 'count' => $statusCounts['contacted']],
                        'in_progress' => ['label' => 'In Discussion', 'count' => $statusCounts['in_progress']],
                        'converted' => ['label' => 'Converted', 'count' => $statusCounts['converted']],
                        'archived' => ['label' => 'Archived', 'count' => $statusCounts['archived']],
                    ];
                @endphp

                @foreach($tabs as $tabKey => $tabData)
                    <a href="{{ route('admin.leads.index', ['status' => $tabKey, 'search' => $search]) }}"
                       class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 {{ $status === $tabKey ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20' : 'bg-black/30 hover:bg-white/10 text-slate-300 border border-white/5' }}">
                        <span>{{ $tabData['label'] }}</span>
                        <span class="px-1.5 py-0.2 rounded-full text-[10px] {{ $status === $tabKey ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400' }}">
                            {{ $tabData['count'] }}
                        </span>
                    </a>
                @endforeach
            </div>

            <!-- Search Form -->
            <form method="GET" action="{{ route('admin.leads.index') }}" class="flex items-center gap-2">
                <input type="hidden" name="status" value="{{ $status }}">
                <div class="relative">
                    <input type="text" name="search" value="{{ $search }}" placeholder="Search name, email, subject..."
                           class="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors">
                    <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                @if($search)
                    <a href="{{ route('admin.leads.index', ['status' => $status]) }}" class="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs" title="Clear search">✕</a>
                @endif
                <button type="submit" class="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors">
                    Search
                </button>
            </form>
        </div>
    </div>

    <!-- Leads List -->
    @if($leads->isEmpty())
        <div class="glass-panel rounded-2xl p-12 text-center text-slate-400">
            <svg class="w-16 h-16 mx-auto text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
            <h3 class="text-lg font-bold text-white font-heading">No inquiries found</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                @if($search)
                    No results match "{{ $search }}" with status "{{ $status }}".
                @else
                    No inquiries recorded in this tab category yet.
                @endif
            </p>
        </div>
    @else
        <div class="space-y-4">
            @foreach($leads as $lead)
                <div class="glass-panel rounded-2xl p-5 md:p-6 border border-white/5 hover:border-cyan-500/30 transition-all space-y-4">
                    <!-- Top Bar: Sender details & Status Badge -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-base font-heading">
                                {{ strtoupper(substr($lead->name, 0, 1)) }}
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold text-base text-white font-heading">{{ $lead->name }}</h4>
                                    <span class="text-[11px] text-slate-500 font-mono">#{{ $lead->id }}</span>
                                    @if(($lead->email_count ?? 0) > 0)
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1" title="Last emailed: {{ $lead->last_emailed_at?->format('M d, Y h:i A') }}">
                                            <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                            Emailed ({{ $lead->email_count }})
                                        </span>
                                    @endif
                                </div>
                                <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                                    <span class="text-cyan-400 flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        {{ $lead->email }}
                                    </span>
                                    @if($lead->phone)
                                        <span>•</span>
                                        <a href="tel:{{ $lead->phone }}" class="text-slate-300 hover:underline">{{ $lead->phone }}</a>
                                    @endif
                                    <span>•</span>
                                    <span class="text-slate-500 font-mono">{{ $lead->ip_address }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Date & Quick Actions -->
                        <div class="flex items-center gap-2.5 sm:self-auto self-end">
                            <span class="text-xs text-slate-400 font-mono hidden md:inline" title="{{ $lead->created_at->format('Y-m-d H:i:s') }}">
                                {{ $lead->created_at->format('M d, Y • h:i A') }}
                            </span>

                            <!-- Send Email Button (Opens Composer Modal) -->
                            <button type="button"
                                    onclick="openContactEmailModal({{ json_encode($lead) }})"
                                    class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                <span>Send Email</span>
                            </button>

                            <a href="mailto:{{ $lead->email }}?subject=Re: {{ rawurlencode($lead->subject) }}"
                               class="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-colors" title="Open in default mail client">
                                ↗
                            </a>
                        </div>
                    </div>

                    <!-- Subject & Full Message -->
                    <div>
                        <div class="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Subject</div>
                        <div class="text-sm font-semibold text-white bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/5">
                            {{ $lead->subject }}
                        </div>

                        <div class="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-3 mb-1">Message Content</div>
                        <div class="text-sm text-slate-200 bg-black/20 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                            {{ $lead->message }}
                        </div>
                    </div>

                    <!-- Internal Note & Status Update Form -->
                    <div class="pt-3 border-t border-white/5 bg-black/20 -mx-5 -mb-5 md:-mx-6 md:-mb-6 p-4 rounded-b-2xl">
                        <form method="POST" action="{{ route('admin.leads.update', $lead->id) }}" class="space-y-3">
                            @csrf
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                                <!-- Status Selector -->
                                <div class="md:col-span-3">
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pipeline Status</label>
                                    <select name="status" class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500">
                                        <option value="new" {{ $lead->status === 'new' ? 'selected' : '' }}>🔵 New / Unread</option>
                                        <option value="contacted" {{ $lead->status === 'contacted' ? 'selected' : '' }}>💬 Contacted</option>
                                        <option value="in_progress" {{ $lead->status === 'in_progress' ? 'selected' : '' }}>⏳ In Discussion</option>
                                        <option value="converted" {{ $lead->status === 'converted' ? 'selected' : '' }}>🟢 Converted / Won</option>
                                        <option value="archived" {{ $lead->status === 'archived' ? 'selected' : '' }}>⚪ Archived</option>
                                    </select>
                                </div>

                                <!-- Internal Notes -->
                                <div class="md:col-span-6">
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Admin Internal Notes & Activity Log</label>
                                    <input type="text" name="notes" value="{{ $lead->notes }}" placeholder="Add private notes (e.g. Quoted $500, waiting on response)..."
                                           class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500">
                                </div>

                                <!-- Action Buttons -->
                                <div class="md:col-span-3 flex items-center gap-2">
                                    <button type="submit" class="flex-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all">
                                        Save Note
                                    </button>
                                    <button type="button" onclick="confirmDelete('{{ route('admin.leads.delete', $lead->id) }}', '{{ $lead->id }}')" class="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors" title="Delete lead">
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
                {{ $leads->links() }}
            </div>
        </div>
    @endif
</div>

<!-- ============================================================ -->
<!-- Send Email Composer Modal -->
<!-- ============================================================ -->
<div id="emailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md hidden">
    <div class="relative w-full max-w-2xl bg-[#12121c] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="p-5 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-black/60 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                    <h3 class="font-heading font-bold text-base text-white">Send Email to Client</h3>
                    <p class="text-xs text-slate-400" id="modalClientInfo">Direct transmission via system SMTP</p>
                </div>
            </div>
            <button onclick="closeEmailModal()" class="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                ✕
            </button>
        </div>

        <!-- Modal Form Body -->
        <form id="emailForm" method="POST" action="" class="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            @csrf

            <!-- Recipient Display -->
            <div class="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div class="text-xs text-slate-400">
                    To: <span id="modalTo" class="font-bold text-white"></span>
                </div>
                <div class="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    From: {{ config('mail.from.address') ?: config('portfolio.contact_email') }}
                </div>
            </div>

            <!-- Quick Template Selector -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    ⚡ Use Quick Email Template
                </label>
                <select id="templateSelector" onchange="applyTemplate()" class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500">
                    <option value="discovery">1. Initial Response & Discovery Call Invitation</option>
                    <option value="quotation">2. Request for Project Specifications & Quotation Scope</option>
                    <option value="meeting">3. Meeting Scheduling with Google Meet / Zoom</option>
                    <option value="followup">4. Polite Follow-up on Inquiry</option>
                    <option value="custom">5. Empty Custom Draft</option>
                </select>
            </div>

            <!-- Subject -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Subject</label>
                <input type="text" id="emailSubject" name="subject" required
                       class="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors">
            </div>

            <!-- Message Body -->
            <div>
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Body Content</label>
                <textarea id="emailMessage" name="message" rows="8" required
                          class="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans leading-relaxed"></textarea>
            </div>

            <!-- Auto Update Pipeline Status -->
            <div class="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                    <label class="text-xs font-bold text-white block">Auto-update Pipeline Status to:</label>
                    <span class="text-[11px] text-slate-400">Updates status and appends timestamped log to lead notes.</span>
                </div>
                <select name="update_status" class="px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500">
                    <option value="contacted" selected>💬 Contacted</option>
                    <option value="in_progress">⏳ In Discussion</option>
                    <option value="converted">🟢 Converted / Won</option>
                    <option value="">(Keep Current Status)</option>
                </select>
            </div>

            <!-- Footer Actions -->
            <div class="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                <button type="button" onclick="closeEmailModal()" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold">
                    Cancel
                </button>
                <button type="submit" id="sendBtn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    <span>Send Email Now</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Delete Form Modal Helper -->
<form id="deleteForm" method="POST" action="" class="hidden">
    @csrf
    @method('DELETE')
</form>

<script>
    const PORTFOLIO_CONFIG = {
        ownerName: @json(config('portfolio.owner_name')),
        contactPhone: @json(config('portfolio.contact_phone')),
        contactEmail: @json(config('portfolio.contact_email')),
        fromAddress: @json(config('mail.from.address'))
    };

    let currentLead = null;

    function openContactEmailModal(lead) {
        currentLead = lead;
        const modal = document.getElementById('emailModal');
        const form = document.getElementById('emailForm');
        form.action = `/admin/leads/${lead.id}/send-email`;

        document.getElementById('modalTo').innerText = `${lead.name} <${lead.email}>`;
        document.getElementById('modalClientInfo').innerText = `Client Inquiry: "${lead.subject}"`;

        document.getElementById('templateSelector').value = 'discovery';
        applyTemplate();

        modal.classList.remove('hidden');
    }

    function closeEmailModal() {
        document.getElementById('emailModal').classList.add('hidden');
    }

    function applyTemplate() {
        if (!currentLead) return;

        const val = document.getElementById('templateSelector').value;
        const subjectInput = document.getElementById('emailSubject');
        const messageInput = document.getElementById('emailMessage');

        if (val === 'discovery') {
            subjectInput.value = `Re: ${currentLead.subject} — Next Steps & Discussion`;
            messageInput.value = `Hi ${currentLead.name},

Thank you for reaching out regarding "${currentLead.subject}". I have reviewed your inquiry and would be delighted to assist you with your project.

To better understand your goals, architecture requirements, and timeline, I'd like to invite you for a brief 15-minute discovery call this week.

Could you let me know what day and time window works best for you? Alternatively, you can directly reply with any additional specifications or documentation you have.

Looking forward to collaborating with you!

Warm regards,
${PORTFOLIO_CONFIG.ownerName}
Full-Stack Software Developer & Mobile Specialist
Phone / WhatsApp: ${PORTFOLIO_CONFIG.contactPhone}`;
        } else if (val === 'quotation') {
            subjectInput.value = `Project Scope & Quotation Discussion — ${currentLead.subject}`;
            messageInput.value = `Hi ${currentLead.name},

I hope you are doing well.

Regarding your project inquiry "${currentLead.subject}", I am putting together an initial scope breakdown and cost estimation for you.

To ensure accuracy, could you share a few more details:
1. What are the key features or core deliverables you need for the MVP?
2. Do you have existing UI design files (Figma/Adobe XD) or should design be included?
3. What is your expected launch timeline?

Once confirmed, I will prepare a transparent proposal with milestone estimates.

Best regards,
${PORTFOLIO_CONFIG.ownerName}
${PORTFOLIO_CONFIG.contactPhone}`;
        } else if (val === 'meeting') {
            subjectInput.value = `Invitation: Discovery Call with ${PORTFOLIO_CONFIG.ownerName}`;
            messageInput.value = `Hi ${currentLead.name},

Thanks again for connecting through my portfolio!

Let's schedule a quick call to go over your requirements for "${currentLead.subject}". Please let me know which time slot suits you:

• Slot 1: Tomorrow at 4:00 PM IST
• Slot 2: Tomorrow at 6:30 PM IST
• Slot 3: Day after tomorrow at 3:00 PM IST

If none of these suit your schedule, please propose a time that works best for you.

Talk soon,
${PORTFOLIO_CONFIG.ownerName}
${PORTFOLIO_CONFIG.contactPhone}`;
        } else if (val === 'followup') {
            subjectInput.value = `Following up regarding "${currentLead.subject}"`;
            messageInput.value = `Hi ${currentLead.name},

I wanted to quickly follow up regarding the inquiry you submitted on my portfolio website for "${currentLead.subject}".

Are you still looking to move forward with this project? I would love to answer any questions you have and help bring your ideas to life.

Feel free to reply directly or call/WhatsApp me at ${PORTFOLIO_CONFIG.contactPhone}.

Best regards,
${PORTFOLIO_CONFIG.ownerName}`;
        } else {
            subjectInput.value = `Re: ${currentLead.subject}`;
            messageInput.value = `Hi ${currentLead.name},

`;
        }
    }

    function confirmDelete(url, id) {
        if (confirm(`Are you sure you want to delete lead #${id}? This action cannot be undone.`)) {
            const form = document.getElementById('deleteForm');
            form.action = url;
            form.submit();
        }
    }
</script>
@endsection
