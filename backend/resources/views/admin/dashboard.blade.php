@extends('admin.layouts.app')

@section('title', 'Admin Dashboard')
@section('page_title', 'Dashboard Overview')

@section('content')
<div class="space-y-8">
    <!-- Welcome Banner -->
    <div class="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-black/60 border border-cyan-500/20 shadow-2xl">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-2">
                    Someshwar Portfolio Management
                </span>
                <h2 class="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
                    Welcome back, {{ Auth::user()->name }}! 👋
                </h2>
                <p class="text-sm text-slate-300 mt-1 max-w-2xl">
                    Here's a live overview of incoming client inquiries, project consultation requests, and leads captured from your portfolio website.
                </p>
            </div>
            <div class="flex items-center gap-3">
                <a href="{{ route('admin.leads.export') }}" class="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Export Leads (CSV)
                </a>
            </div>
        </div>
    </div>

    <!-- Metric Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- Card 1: Total Contact Queries -->
        <div class="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Queries</span>
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
            </div>
            <div class="mt-4 flex items-baseline gap-2">
                <span class="text-3xl font-extrabold text-white font-heading">{{ $totalContactLeads }}</span>
                <span class="text-xs text-slate-400">Total received</span>
            </div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span class="text-cyan-400 font-semibold">{{ $newContactLeads }} New / Unread</span>
                <a href="{{ route('admin.leads.index') }}" class="text-slate-400 hover:text-white transition-colors">View all &rarr;</a>
            </div>
        </div>

        <!-- Card 2: New Inquiries -->
        <div class="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Needed</span>
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
            </div>
            <div class="mt-4 flex items-baseline gap-2">
                <span class="text-3xl font-extrabold text-emerald-400 font-heading">{{ $newContactLeads + $newConsultations }}</span>
                <span class="text-xs text-slate-400">Fresh leads</span>
            </div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span class="text-emerald-400 font-semibold">Ready for reply</span>
                <a href="{{ route('admin.leads.index', ['status' => 'new']) }}" class="text-slate-400 hover:text-white transition-colors">Filter new &rarr;</a>
            </div>
        </div>

        <!-- Card 3: Consultation Requests -->
        <div class="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultation Requests</span>
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
            </div>
            <div class="mt-4 flex items-baseline gap-2">
                <span class="text-3xl font-extrabold text-white font-heading">{{ $totalConsultations }}</span>
                <span class="text-xs text-slate-400">Total bookings</span>
            </div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span class="text-purple-400 font-semibold">{{ $newConsultations }} Pending</span>
                <a href="{{ route('admin.consultations.index') }}" class="text-slate-400 hover:text-white transition-colors">View all &rarr;</a>
            </div>
        </div>

        <!-- Card 4: Converted Leads -->
        <div class="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-pink-500/40 transition-all">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Converted Clients</span>
                <div class="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                </div>
            </div>
            <div class="mt-4 flex items-baseline gap-2">
                <span class="text-3xl font-extrabold text-pink-400 font-heading">{{ $leadsByStatus['converted'] }}</span>
                <span class="text-xs text-slate-400">Deals Closed</span>
            </div>
            <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span class="text-slate-400">{{ $leadsByStatus['in_progress'] }} In Discussion</span>
                <a href="{{ route('admin.leads.index', ['status' => 'converted']) }}" class="text-slate-400 hover:text-white transition-colors">Review &rarr;</a>
            </div>
        </div>
    </div>

    <!-- Status Distribution Bar -->
    <div class="glass-panel rounded-2xl p-6">
        <h3 class="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
            <span>Contact Query Pipeline Status</span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div class="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 text-center">
                <div class="text-xs text-slate-400 font-medium">New / Unread</div>
                <div class="text-xl font-extrabold text-cyan-400 mt-1">{{ $leadsByStatus['new'] }}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-blue-500/20 text-center">
                <div class="text-xs text-slate-400 font-medium">Contacted</div>
                <div class="text-xl font-extrabold text-blue-400 mt-1">{{ $leadsByStatus['contacted'] }}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 text-center">
                <div class="text-xs text-slate-400 font-medium">In Discussion</div>
                <div class="text-xl font-extrabold text-amber-400 mt-1">{{ $leadsByStatus['in_progress'] }}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                <div class="text-xs text-slate-400 font-medium">Converted</div>
                <div class="text-xl font-extrabold text-emerald-400 mt-1">{{ $leadsByStatus['converted'] }}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-slate-500/20 text-center col-span-2 sm:col-span-1">
                <div class="text-xs text-slate-400 font-medium">Archived</div>
                <div class="text-xl font-extrabold text-slate-400 mt-1">{{ $leadsByStatus['archived'] }}</div>
            </div>
        </div>
    </div>

    <!-- Two Column Tables: Recent Leads & Consultations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Contact Leads -->
        <div class="glass-panel rounded-2xl p-6 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="font-heading font-bold text-base text-white">Recent Contact Inquiries</h3>
                </div>
                <a href="{{ route('admin.leads.index') }}" class="text-xs text-cyan-400 hover:text-cyan-300 font-medium">View All &rarr;</a>
            </div>

            @if($recentContactLeads->isEmpty())
                <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 text-sm">
                    <svg class="w-12 h-12 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                    No contact inquiries yet. They will appear here when visitors reach out from the contact section.
                </div>
            @else
                <div class="space-y-3 flex-1 overflow-x-auto">
                    @foreach($recentContactLeads as $lead)
                        <div class="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-cyan-500/30 transition-all flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-sm text-white truncate">{{ $lead->name }}</span>
                                    @if($lead->status === 'new')
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">NEW</span>
                                    @elseif($lead->status === 'contacted')
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">CONTACTED</span>
                                    @elseif($lead->status === 'in_progress')
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">IN PROGRESS</span>
                                    @elseif($lead->status === 'converted')
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">CONVERTED</span>
                                    @else
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/40">ARCHIVED</span>
                                    @endif
                                </div>
                                <div class="text-xs text-slate-400 mt-0.5 truncate">{{ $lead->email }}</div>
                                <div class="text-xs text-slate-300 font-medium mt-1 truncate">"{{ $lead->subject }}"</div>
                                <p class="text-xs text-slate-400 mt-1 line-clamp-1">{{ $lead->message }}</p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <span class="text-[11px] text-slate-500 font-mono">{{ $lead->created_at->diffForHumans() }}</span>
                                <div class="mt-2">
                                    <a href="{{ route('admin.leads.index', ['search' => $lead->email]) }}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        Compose Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Recent Consultation Bookings -->
        <div class="glass-panel rounded-2xl p-6 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="font-heading font-bold text-base text-white">Recent Consultation Requests</h3>
                </div>
                <a href="{{ route('admin.consultations.index') }}" class="text-xs text-purple-400 hover:text-purple-300 font-medium">View All &rarr;</a>
            </div>

            @if($recentConsultations->isEmpty())
                <div class="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 text-sm">
                    <svg class="w-12 h-12 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    No consultation inquiries yet. They will appear here when clients request a discovery call.
                </div>
            @else
                <div class="space-y-3 flex-1 overflow-x-auto">
                    @foreach($recentConsultations as $consult)
                        <div class="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-purple-500/30 transition-all flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-sm text-white truncate">{{ $consult->name }}</span>
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">{{ $consult->project_type ?? 'Consultation' }}</span>
                                </div>
                                <div class="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                                    <span>{{ $consult->email }}</span>
                                    @if($consult->phone)
                                        <span>• {{ $consult->phone }}</span>
                                    @endif
                                </div>
                                <div class="text-xs text-slate-300 font-medium mt-1 flex items-center gap-2">
                                    <span class="text-emerald-400 font-bold">{{ $consult->budget ?? 'Flexible' }}</span>
                                    <span class="text-slate-500">|</span>
                                    <span class="text-slate-400">{{ $consult->timeline ?? 'Timeline TBA' }}</span>
                                </div>
                                @if($consult->details)
                                    <p class="text-xs text-slate-400 mt-1 line-clamp-1">{{ $consult->details }}</p>
                                @endif
                            </div>
                            <div class="text-right flex-shrink-0">
                                <span class="text-[11px] text-slate-500 font-mono">{{ $consult->created_at->diffForHumans() }}</span>
                                <div class="mt-2">
                                    <a href="{{ route('admin.consultations.index', ['search' => $consult->email]) }}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                        Compose Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection

