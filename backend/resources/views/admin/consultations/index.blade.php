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

    <!-- Consultation Data Table -->
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
        <!-- Responsive Data Table Container -->
        <div class="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs text-slate-300 border-collapse">
                    <!-- Table Head -->
                    <thead>
                        <tr class="bg-black/60 border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                            <th class="py-3.5 px-4 w-12 text-center">#ID</th>
                            <th class="py-3.5 px-4 min-w-[220px]">Client / Contact</th>
                            <th class="py-3.5 px-4 min-w-[260px]">Project Scope & Details</th>
                            <th class="py-3.5 px-4 min-w-[140px]">Pipeline Status</th>
                            <th class="py-3.5 px-4 min-w-[140px]">Email History</th>
                            <th class="py-3.5 px-4 min-w-[130px]">Received At</th>
                            <th class="py-3.5 px-4 min-w-[170px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <!-- Table Body -->
                    <tbody class="divide-y divide-white/5">
                        @foreach($consultations as $consult)
                            @php
                                $statusBadgeClasses = [
                                    'new' => 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                                    'contacted' => 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                                    'in_progress' => 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                                    'converted' => 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                                    'archived' => 'bg-slate-500/20 text-slate-400 border-slate-500/40',
                                ][$consult->status] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/40';
                            @endphp

                            <!-- Main Row -->
                            <tr class="hover:bg-white/[0.03] transition-colors group">
                                <!-- ID -->
                                <td class="py-4 px-4 text-center font-mono text-slate-500 font-bold">
                                    #{{ $consult->id }}
                                </td>

                                <!-- Client / Contact -->
                                <td class="py-4 px-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-sm font-heading flex-shrink-0">
                                            {{ strtoupper(substr($consult->name, 0, 1)) }}
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-bold text-white text-sm font-heading truncate flex items-center gap-2">
                                                <span>{{ $consult->name }}</span>
                                                @if($consult->notes)
                                                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400" title="Has internal notes"></span>
                                                @endif
                                            </div>
                                            <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                                <a href="mailto:{{ $consult->email }}" class="hover:text-purple-300 transition-colors truncate max-w-[160px]" title="{{ $consult->email }}">
                                                    {{ $consult->email }}
                                                </a>
                                                <button type="button" onclick="navigator.clipboard.writeText('{{ $consult->email }}'); alert('Email copied!');" class="text-slate-500 hover:text-slate-300 p-0.5" title="Copy email">
                                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                                </button>
                                            </div>
                                            @if($consult->phone)
                                                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                                    <a href="tel:{{ $consult->phone }}" class="hover:text-emerald-400 transition-colors">
                                                        📞 {{ $consult->phone }}
                                                    </a>
                                                    <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $consult->phone) }}" target="_blank" class="text-emerald-400 hover:text-emerald-300 font-bold font-mono">
                                                        WhatsApp ↗
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                </td>

                                <!-- Project Scope & Details -->
                                <td class="py-4 px-4">
                                    <div class="space-y-1.5">
                                        <div class="flex flex-wrap items-center gap-1.5">
                                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                                {{ $consult->project_type ?: 'Custom Software' }}
                                            </span>
                                            @if($consult->budget)
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                                    💰 {{ $consult->budget }}
                                                </span>
                                            @endif
                                            @if($consult->timeline)
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                                    ⏱️ {{ $consult->timeline }}
                                                </span>
                                            @endif
                                        </div>
                                        @if($consult->details)
                                            <p class="text-slate-400 text-xs line-clamp-2 max-w-md leading-relaxed cursor-pointer hover:text-slate-200 transition-colors" onclick="toggleConsultDetails({{ $consult->id }})">
                                                {{ $consult->details }}
                                            </p>
                                        @endif
                                        <button type="button" onclick="toggleConsultDetails({{ $consult->id }})" class="text-[11px] text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 mt-0.5">
                                            <span id="consultBtnText-{{ $consult->id }}">View Full Brief & Notes &darr;</span>
                                        </button>
                                    </div>
                                </td>

                                <!-- Status Dropdown -->
                                <td class="py-4 px-4">
                                    <form method="POST" action="{{ route('admin.consultations.update', $consult->id) }}" id="consultStatusForm-{{ $consult->id }}">
                                        @csrf
                                        <input type="hidden" name="notes" value="{{ $consult->notes }}">
                                        <select name="status" onchange="document.getElementById('consultStatusForm-{{ $consult->id }}').submit()"
                                                class="px-2.5 py-1.5 rounded-xl text-xs font-semibold border bg-black/60 focus:outline-none focus:border-purple-500 cursor-pointer transition-all {{ $statusBadgeClasses }}">
                                            <option value="new" {{ $consult->status === 'new' ? 'selected' : '' }}>🟣 New</option>
                                            <option value="contacted" {{ $consult->status === 'contacted' ? 'selected' : '' }}>💬 Contacted</option>
                                            <option value="in_progress" {{ $consult->status === 'in_progress' ? 'selected' : '' }}>⏳ In Progress</option>
                                            <option value="converted" {{ $consult->status === 'converted' ? 'selected' : '' }}>🟢 Won / Signed</option>
                                            <option value="archived" {{ $consult->status === 'archived' ? 'selected' : '' }}>⚪ Archived</option>
                                        </select>
                                    </form>
                                </td>

                                <!-- Email History -->
                                <td class="py-4 px-4">
                                    @if(($consult->email_count ?? 0) > 0)
                                        <div class="inline-flex flex-col gap-1">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1 w-max">
                                                <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                                Sent ({{ $consult->email_count }})
                                            </span>
                                            @if($consult->last_emailed_at)
                                                <span class="text-[10px] text-slate-500 font-mono" title="{{ $consult->last_emailed_at->format('Y-m-d H:i:s') }}">
                                                    {{ $consult->last_emailed_at->diffForHumans() }}
                                                </span>
                                            @endif
                                        </div>
                                    @else
                                        <span class="text-[11px] text-slate-500 italic">No email sent</span>
                                    @endif
                                </td>

                                <!-- Received At -->
                                <td class="py-4 px-4">
                                    <div class="text-xs text-white font-medium">
                                        {{ $consult->created_at->format('M d, Y') }}
                                    </div>
                                    <div class="text-[11px] text-slate-500 font-mono mt-0.5">
                                        {{ $consult->created_at->format('h:i A') }} • {{ $consult->created_at->diffForHumans() }}
                                    </div>
                                </td>

                                <!-- Action Buttons -->
                                <td class="py-4 px-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <!-- Compose Email Trigger -->
                                        <button type="button"
                                                onclick="openConsultEmailModal({{ json_encode($consult) }})"
                                                class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20 inline-flex items-center gap-1.5 flex-shrink-0"
                                                title="Send email via SMTP">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                            <span>Email</span>
                                        </button>

                                        <!-- Toggle Details Accordion -->
                                        <button type="button"
                                                onclick="toggleConsultDetails({{ $consult->id }})"
                                                class="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                                                title="View details & edit notes">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                        </button>

                                        <!-- Delete Consultation -->
                                        <button type="button"
                                                onclick="confirmDeleteConsult('{{ route('admin.consultations.delete', $consult->id) }}', '{{ $consult->id }}')"
                                                class="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                                                title="Delete booking">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <!-- Expandable Details Row (Accordion) -->
                            <tr id="consultDetails-{{ $consult->id }}" class="hidden bg-black/40 border-b border-white/10">
                                <td colspan="7" class="p-5 md:p-6">
                                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
                                        <!-- Full Details Content (7 cols) -->
                                        <div class="lg:col-span-7 space-y-3">
                                            <div class="flex items-center justify-between">
                                                <span class="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                                    Full Consultation Brief & Requirements
                                                </span>
                                                <span class="text-[11px] text-slate-500 font-mono">
                                                    IP: {{ $consult->ip_address }} • {{ $consult->user_agent ? Str::limit($consult->user_agent, 45) : 'Direct' }}
                                                </span>
                                            </div>
                                            <div class="p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                                                {{ $consult->details ?: 'No detailed message provided. Client selected standard consultation for: ' . ($consult->project_type ?? 'Software Development') }}
                                            </div>
                                            <div class="flex items-center gap-2 pt-1">
                                                <button type="button"
                                                        onclick="openConsultEmailModal({{ json_encode($consult) }})"
                                                        class="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs border border-purple-500/40 transition-colors inline-flex items-center gap-1.5">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                                    Compose Reply to {{ $consult->name }}
                                                </button>
                                                @if($consult->phone)
                                                    <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $consult->phone) }}?text={{ urlencode('Hi ' . $consult->name . ', thank you for booking a consultation on my portfolio.') }}"
                                                       target="_blank"
                                                       class="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition-colors inline-flex items-center gap-1">
                                                        Open in WhatsApp ↗
                                                    </a>
                                                @endif
                                            </div>
                                        </div>

                                        <!-- Notes & Pipeline Management (5 cols) -->
                                        <div class="lg:col-span-5 space-y-3">
                                            <span class="text-[11px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                Internal Notes & Meeting Summary
                                            </span>
                                            <form method="POST" action="{{ route('admin.consultations.update', $consult->id) }}" class="space-y-3">
                                                @csrf
                                                <input type="hidden" name="status" value="{{ $consult->status }}">
                                                <textarea name="notes" rows="4" placeholder="Record discussion points, call summary, negotiated milestones, or links..."
                                                          class="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors">{{ $consult->notes }}</textarea>
                                                <div class="flex items-center justify-between">
                                                    <span class="text-[11px] text-slate-500">Only visible to administrators.</span>
                                                    <button type="submit" class="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors shadow-md shadow-pink-600/20">
                                                        Save Note
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Table Pagination Footer -->
            <div class="p-4 bg-black/40 border-t border-white/5">
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
                    From: {{ config('mail.from.address') ?: config('portfolio.contact_email') }}
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
    const PORTFOLIO_CONFIG = {
        ownerName: @json(config('portfolio.owner_name')),
        contactPhone: @json(config('portfolio.contact_phone')),
        contactEmail: @json(config('portfolio.contact_email')),
        fromAddress: @json(config('mail.from.address'))
    };

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
            subjectInput.value = `Strategy Call: ${proj} Consultation — ${PORTFOLIO_CONFIG.ownerName}`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for requesting a project consultation for ${proj}.

I've reviewed your brief:
• Budget: ${activeConsult.budget || 'Flexible'}
• Timeline: ${activeConsult.timeline || 'Flexible'}
${activeConsult.details ? `• Details: "${activeConsult.details}"` : ''}

I would love to jump on a quick 15-minute video call to outline technical architecture, milestones, and deliverable timelines.

Are you available for a brief call tomorrow or day after? Please let me know what time works best for you.

Best regards,
${PORTFOLIO_CONFIG.ownerName}
Full-Stack Software Developer
Phone / WhatsApp: ${PORTFOLIO_CONFIG.contactPhone}`;
        } else if (val === 'proposal') {
            subjectInput.value = `Proposal & Architecture Overview for ${proj}`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for your interest in hiring me for ${proj}.

I have outlined an initial project roadmap and architecture proposal designed to meet your target timeline (${activeConsult.timeline || 'standard'}).

Could you please confirm if you have any third-party APIs, database preferences, or existing repositories we need to integrate?

I look forward to finalizing the project scope with you.

Warm regards,
${PORTFOLIO_CONFIG.ownerName}
${PORTFOLIO_CONFIG.contactPhone}`;
        } else if (val === 'budget') {
            subjectInput.value = `Budget & Milestone Confirmation — ${proj}`;
            messageInput.value = `Hi ${activeConsult.name},

Thank you for sharing your project specifications.

Regarding the ${activeConsult.budget || 'discussed'} budget and timeline, I can accommodate the core deliverables within this framework by structuring development into 2 milestones:

1. Milestone 1: Core Architecture, Database Schema, and UI Flow
2. Milestone 2: Business Logic, Integration, Testing & Deployment

Let me know if this aligns with your expectations so we can get started!

Best regards,
${PORTFOLIO_CONFIG.ownerName}`;
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

    function toggleConsultDetails(id) {
        const row = document.getElementById(`consultDetails-${id}`);
        const btnText = document.getElementById(`consultBtnText-${id}`);
        if (!row) return;

        if (row.classList.contains('hidden')) {
            row.classList.remove('hidden');
            if (btnText) btnText.innerHTML = 'Hide Brief & Notes &uarr;';
        } else {
            row.classList.add('hidden');
            if (btnText) btnText.innerHTML = 'View Full Brief & Notes &darr;';
        }
    }
</script>
@endsection
