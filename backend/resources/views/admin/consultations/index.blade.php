@extends('admin.layouts.app')

@section('title', 'Consultation Bookings')
@section('page_title', 'Project Consultations & Hire Inquiries')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-white font-heading">Consultation & Hire Requests</h2>
            <p class="text-xs text-slate-400 mt-1">High-intent project inquiries received through the "Book Consultation" and "Hire Me" modals.</p>
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
                                </div>
                                <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                                    <a href="mailto:{{ $consult->email }}" class="text-purple-400 hover:underline flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        {{ $consult->email }}
                                    </a>
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
                            <span class="text-xs text-slate-400 font-mono">
                                {{ $consult->created_at->format('M d, Y • h:i A') }}
                            </span>
                            @if($consult->phone)
                                <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $consult->phone) }}" target="_blank"
                                   class="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1">
                                    WhatsApp
                                </a>
                            @endif
                            <a href="mailto:{{ $consult->email }}?subject=Project Consultation Call Request"
                               class="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors flex items-center gap-1">
                                Email
                            </a>
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
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Admin Internal Notes</label>
                                    <input type="text" name="notes" value="{{ $consult->notes }}" placeholder="Meeting link sent, proposal discussed, etc..."
                                           class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500">
                                </div>

                                <!-- Action Buttons -->
                                <div class="md:col-span-3 flex items-center gap-2">
                                    <button type="submit" class="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20">
                                        Update
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

<!-- Delete Form Helper -->
<form id="deleteConsultForm" method="POST" action="" class="hidden">
    @csrf
    @method('DELETE')
</form>

<script>
    function confirmDeleteConsult(url, id) {
        if (confirm(`Are you sure you want to delete consultation #${id}?`)) {
            const form = document.getElementById('deleteConsultForm');
            form.action = url;
            form.submit();
        }
    }
</script>
@endsection

