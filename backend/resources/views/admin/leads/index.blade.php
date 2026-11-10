@extends('admin.layouts.app')

@section('title', 'Contact Queries')
@section('page_title', 'Contact Leads & Messages')

@section('content')
<div class="space-y-6">
    <!-- Header with Quick Export -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-white font-heading">Incoming Portfolio Leads</h2>
            <p class="text-xs text-slate-400 mt-1">Manage, update status, and track client inquiries sent via the website contact form.</p>
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
                        'new' => ['label' => 'New', 'count' => $statusCounts['new'], 'badge' => 'bg-cyan-500/20 text-cyan-300'],
                        'contacted' => ['label' => 'Contacted', 'count' => $statusCounts['contacted'], 'badge' => 'bg-blue-500/20 text-blue-300'],
                        'in_progress' => ['label' => 'In Discussion', 'count' => $statusCounts['in_progress'], 'badge' => 'bg-amber-500/20 text-amber-300'],
                        'converted' => ['label' => 'Converted', 'count' => $statusCounts['converted'], 'badge' => 'bg-emerald-500/20 text-emerald-300'],
                        'archived' => ['label' => 'Archived', 'count' => $statusCounts['archived'], 'badge' => 'bg-slate-500/20 text-slate-300'],
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
                                </div>
                                <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                                    <a href="mailto:{{ $lead->email }}" class="text-cyan-400 hover:underline flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        {{ $lead->email }}
                                    </a>
                                    @if($lead->phone)
                                        <span>•</span>
                                        <a href="tel:{{ $lead->phone }}" class="text-slate-300 hover:underline">{{ $lead->phone }}</a>
                                    @endif
                                    <span>•</span>
                                    <span class="text-slate-500">{{ $lead->ip_address }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Date & Quick Actions -->
                        <div class="flex items-center gap-3 sm:self-auto self-end">
                            <span class="text-xs text-slate-400 font-mono" title="{{ $lead->created_at->format('Y-m-d H:i:s') }}">
                                {{ $lead->created_at->format('M d, Y • h:i A') }} ({{ $lead->created_at->diffForHumans() }})
                            </span>
                            <a href="mailto:{{ $lead->email }}?subject=Re: {{ rawurlencode($lead->subject) }}"
                               class="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                                Direct Reply
                            </a>
                        </div>
                    </div>

                    <!-- Subject & Full Message -->
                    <div>
                        <div class="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Subject</div>
                        <div class="text-sm font-semibold text-white bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                            {{ $lead->subject }}
                        </div>

                        <div class="text-xs text-slate-400 font-medium uppercase tracking-wider mt-3 mb-1">Message Content</div>
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
                                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Admin Internal Notes</label>
                                    <input type="text" name="notes" value="{{ $lead->notes }}" placeholder="Add private notes (e.g. Quoted $500, waiting on response)..."
                                           class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500">
                                </div>

                                <!-- Update Button -->
                                <div class="md:col-span-3 flex items-center gap-2">
                                    <button type="submit" class="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition-all shadow-md shadow-cyan-500/10">
                                        Save Status
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

<!-- Delete Form Modal Helper -->
<form id="deleteForm" method="POST" action="" class="hidden">
    @csrf
    @method('DELETE')
</form>

<script>
    function confirmDelete(url, id) {
        if (confirm(`Are you sure you want to delete lead #${id}? This action cannot be undone.`)) {
            const form = document.getElementById('deleteForm');
            form.action = url;
            form.submit();
        }
    }
</script>
@endsection

