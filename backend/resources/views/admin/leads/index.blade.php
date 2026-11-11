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

    <!-- Leads Table -->
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
        <!-- Responsive Data Table Container -->
        <div class="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs text-slate-300 border-collapse">
                    <!-- Table Head -->
                    <thead>
                        <tr class="bg-black/60 border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                            <th class="py-3.5 px-4 w-12 text-center">#ID</th>
                            <th class="py-3.5 px-4 min-w-[220px]">Client / Contact</th>
                            <th class="py-3.5 px-4 min-w-[280px]">Subject & Inquiry</th>
                            <th class="py-3.5 px-4 min-w-[140px]">Pipeline Status</th>
                            <th class="py-3.5 px-4 min-w-[140px]">Email History</th>
                            <th class="py-3.5 px-4 min-w-[130px]">Received At</th>
                            <th class="py-3.5 px-4 min-w-[160px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <!-- Table Body -->
                    <tbody class="divide-y divide-white/5">
                        @foreach($leads as $lead)
                            @php
                                $statusBadgeClasses = [
                                    'new' => 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                                    'contacted' => 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                                    'in_progress' => 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                                    'converted' => 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                                    'archived' => 'bg-slate-500/20 text-slate-400 border-slate-500/40',
                                ][$lead->status] ?? 'bg-slate-500/20 text-slate-300 border-slate-500/40';

                                $statusLabels = [
                                    'new' => '🔵 New / Unread',
                                    'contacted' => '💬 Contacted',
                                    'in_progress' => '⏳ In Discussion',
                                    'converted' => '🟢 Converted',
                                    'archived' => '⚪ Archived',
                                ];
                            @endphp

                            <!-- Main Lead Row -->
                            <tr class="hover:bg-white/[0.03] transition-colors group">
                                <!-- ID -->
                                <td class="py-4 px-4 text-center font-mono text-slate-500 font-bold">
                                    #{{ $lead->id }}
                                </td>

                                <!-- Client / Contact -->
                                <td class="py-4 px-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-sm font-heading flex-shrink-0">
                                            {{ strtoupper(substr($lead->name, 0, 1)) }}
                                        </div>
                                        <div class="min-w-0">
                                            <div class="font-bold text-white text-sm font-heading truncate flex items-center gap-2">
                                                <span>{{ $lead->name }}</span>
                                                @if($lead->notes)
                                                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400" title="Has internal notes"></span>
                                                @endif
                                            </div>
                                            <div class="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                                <a href="mailto:{{ $lead->email }}" class="hover:text-cyan-400 transition-colors truncate max-w-[160px]" title="{{ $lead->email }}">
                                                    {{ $lead->email }}
                                                </a>
                                                <button type="button" onclick="navigator.clipboard.writeText('{{ $lead->email }}'); alert('Email copied!');" class="text-slate-500 hover:text-slate-300 p-0.5" title="Copy email">
                                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                                </button>
                                            </div>
                                            @if($lead->phone)
                                                <div class="text-[11px] text-slate-500 mt-0.5">
                                                    <a href="tel:{{ $lead->phone }}" class="hover:text-emerald-400 transition-colors">
                                                        📞 {{ $lead->phone }}
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                </td>

                                <!-- Subject & Message Snippet -->
                                <td class="py-4 px-4">
                                    <div class="space-y-1">
                                        <div class="font-semibold text-white truncate max-w-xs flex items-center gap-1.5">
                                            <span>{{ $lead->subject }}</span>
                                        </div>
                                        <p class="text-slate-400 text-xs line-clamp-2 max-w-md leading-relaxed cursor-pointer hover:text-slate-200 transition-colors" onclick="toggleDetails({{ $lead->id }})">
                                            {{ $lead->message }}
                                        </p>
                                        <button type="button" onclick="toggleDetails({{ $lead->id }})" class="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 mt-0.5">
                                            <span id="btnText-{{ $lead->id }}">View Full Message & Notes &darr;</span>
                                        </button>
                                    </div>
                                </td>

                                <!-- Status Dropdown -->
                                <td class="py-4 px-4">
                                    <form method="POST" action="{{ route('admin.leads.update', $lead->id) }}" id="statusForm-{{ $lead->id }}">
                                        @csrf
                                        <input type="hidden" name="notes" value="{{ $lead->notes }}">
                                        <select name="status" onchange="document.getElementById('statusForm-{{ $lead->id }}').submit()"
                                                class="px-2.5 py-1.5 rounded-xl text-xs font-semibold border bg-black/60 focus:outline-none focus:border-cyan-500 cursor-pointer transition-all {{ $statusBadgeClasses }}">
                                            <option value="new" {{ $lead->status === 'new' ? 'selected' : '' }}>🔵 New</option>
                                            <option value="contacted" {{ $lead->status === 'contacted' ? 'selected' : '' }}>💬 Contacted</option>
                                            <option value="in_progress" {{ $lead->status === 'in_progress' ? 'selected' : '' }}>⏳ In Discussion</option>
                                            <option value="converted" {{ $lead->status === 'converted' ? 'selected' : '' }}>🟢 Converted</option>
                                            <option value="archived" {{ $lead->status === 'archived' ? 'selected' : '' }}>⚪ Archived</option>
                                        </select>
                                    </form>
                                </td>

                                <!-- Email History -->
                                <td class="py-4 px-4">
                                    @if(($lead->email_count ?? 0) > 0)
                                        <div class="inline-flex flex-col gap-1">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1 w-max">
                                                <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                                Sent ({{ $lead->email_count }})
                                            </span>
                                            @if($lead->last_emailed_at)
                                                <span class="text-[10px] text-slate-500 font-mono" title="{{ $lead->last_emailed_at->format('Y-m-d H:i:s') }}">
                                                    {{ $lead->last_emailed_at->diffForHumans() }}
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
                                        {{ $lead->created_at->format('M d, Y') }}
                                    </div>
                                    <div class="text-[11px] text-slate-500 font-mono mt-0.5">
                                        {{ $lead->created_at->format('h:i A') }} • {{ $lead->created_at->diffForHumans() }}
                                    </div>
                                </td>

                                <!-- Action Buttons -->
                                <td class="py-4 px-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <!-- Compose Email Trigger -->
                                        <button type="button"
                                                onclick="openContactEmailModal({{ json_encode($lead) }})"
                                                class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-md shadow-cyan-500/20 inline-flex items-center gap-1.5 flex-shrink-0"
                                                title="Send email via SMTP">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                            <span>Email</span>
                                        </button>

                                        <!-- Toggle Details Accordion -->
                                        <button type="button"
                                                onclick="toggleDetails({{ $lead->id }})"
                                                class="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                                                title="View message & edit notes">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                        </button>

                                        <!-- Delete Lead -->
                                        <button type="button"
                                                onclick="confirmDelete('{{ route('admin.leads.delete', $lead->id) }}', '{{ $lead->id }}')"
                                                class="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                                                title="Delete lead">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <!-- Expandable Details Row (Accordion) -->
                            <tr id="details-{{ $lead->id }}" class="hidden bg-black/40 border-b border-white/10">
                                <td colspan="7" class="p-5 md:p-6">
                                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
                                        <!-- Full Message Content (7 cols) -->
                                        <div class="lg:col-span-7 space-y-3">
                                            <div class="flex items-center justify-between">
                                                <span class="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                                                    Full Inquiry Message
                                                </span>
                                                <span class="text-[11px] text-slate-500 font-mono">
                                                    IP: {{ $lead->ip_address }} • {{ $lead->user_agent ? Str::limit($lead->user_agent, 45) : 'Direct' }}
                                                </span>
                                            </div>
                                            <div class="p-4 rounded-xl bg-black/60 border border-white/10 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                                                {{ $lead->message }}
                                            </div>
                                            <div class="flex items-center gap-2 pt-1">
                                                <button type="button"
                                                        onclick="openContactEmailModal({{ json_encode($lead) }})"
                                                        class="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors inline-flex items-center gap-1.5">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                                    Compose Reply to {{ $lead->name }}
                                                </button>
                                                <a href="mailto:{{ $lead->email }}?subject=Re: {{ rawurlencode($lead->subject) }}"
                                                   class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors">
                                                    Open in External Mail App ↗
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Notes & Pipeline Management (5 cols) -->
                                        <div class="lg:col-span-5 space-y-3">
                                            <span class="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                Internal Admin Notes & Activity Log
                                            </span>
                                            <form method="POST" action="{{ route('admin.leads.update', $lead->id) }}" class="space-y-3">
                                                @csrf
                                                <input type="hidden" name="status" value="{{ $lead->status }}">
                                                <textarea name="notes" rows="4" placeholder="Record private discussion notes, quoted pricing, meeting links, or call summaries..."
                                                          class="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors">{{ $lead->notes }}</textarea>
                                                <div class="flex items-center justify-between">
                                                    <span class="text-[11px] text-slate-500">Only visible to administrators.</span>
                                                    <button type="submit" class="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-md shadow-purple-600/20">
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

    function toggleDetails(id) {
        const row = document.getElementById(`details-${id}`);
        const btnText = document.getElementById(`btnText-${id}`);
        if (!row) return;

        if (row.classList.contains('hidden')) {
            row.classList.remove('hidden');
            if (btnText) btnText.innerHTML = 'Hide Full Message & Notes &uarr;';
        } else {
            row.classList.add('hidden');
            if (btnText) btnText.innerHTML = 'View Full Message & Notes &darr;';
        }
    }
</script>
@endsection
