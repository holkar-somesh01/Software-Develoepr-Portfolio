<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') | Someshwar Portfolio</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            cyan: '#00d4ff',
                            purple: '#7c3aed',
                            pink: '#f472b6',
                            dark: '#0a0a0f',
                            card: '#12121c',
                            border: 'rgba(255, 255, 255, 0.08)'
                        }
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background-color: #0a0a0f;
            color: #f1f5f9;
        }
        h1, h2, h3, h4, h5, h6, .font-heading {
            font-family: 'Space Grotesk', sans-serif;
        }
        .glass-panel {
            background: rgba(18, 18, 28, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(10, 10, 15, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #00d4ff;
        }
    </style>
</head>
<body class="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black">

    <!-- Ambient Glow Blobs -->
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

    <div class="relative z-10 flex min-h-screen">
        <!-- Sidebar Navigation -->
        <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 glass-panel border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 -translate-x-full">
            <!-- Brand Logo -->
            <div class="p-6 border-b border-white/5 flex items-center justify-between">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-cyan-500/20">
                        &lt;/&gt;
                    </div>
                    <div>
                        <div class="font-heading font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                            Someshwar <span class="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">Admin</span>
                        </div>
                        <div class="text-[11px] text-slate-400 font-mono tracking-wider">LEADS MANAGER</div>
                    </div>
                </a>
                <button onclick="toggleSidebar()" class="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
                    ✕
                </button>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                <div class="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Navigation
                </div>
                
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all {{ request()->routeIs('admin.dashboard') ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                    <span>Dashboard</span>
                </a>

                <a href="{{ route('admin.leads.index') }}" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all {{ request()->routeIs('admin.leads.*') ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span>Contact Queries</span>
                    </div>
                    @php $newLeadsCount = \App\Models\ContactLead::where('status', 'new')->count(); @endphp
                    @if($newLeadsCount > 0)
                        <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">{{ $newLeadsCount }}</span>
                    @endif
                </a>

                <a href="{{ route('admin.consultations.index') }}" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all {{ request()->routeIs('admin.consultations.*') ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span>Consultations</span>
                    </div>
                    @php $newConsultationsCount = \App\Models\ConsultationLead::where('status', 'new')->count(); @endphp
                    @if($newConsultationsCount > 0)
                        <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">{{ $newConsultationsCount }}</span>
                    @endif
                </a>

                <div class="px-3 pt-5 pb-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Quick Actions
                </div>

                <a href="{{ route('admin.leads.export') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Export CSV</span>
                </a>

                <a href="http://localhost:5173" target="_blank" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                    <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    <span>View Portfolio Site</span>
                </a>

                <a href="{{ route('admin.profile') }}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all {{ request()->routeIs('admin.profile') ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5' }}">
                    <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <span>Security & Account</span>
                </a>
            </nav>

            <!-- Admin Profile Card in Sidebar -->
            <div class="p-4 border-t border-white/5 bg-black/30">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold text-sm">
                            {{ substr(Auth::user()->name ?? 'A', 0, 1) }}
                        </div>
                        <div class="truncate">
                            <div class="font-medium text-sm text-white truncate">{{ Auth::user()->name ?? 'Admin' }}</div>
                            <div class="text-[11px] text-slate-400 truncate">{{ Auth::user()->email ?? '' }}</div>
                        </div>
                    </div>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" title="Logout" class="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 md:pl-64 flex flex-col min-w-0">
            <!-- Top Mobile Bar -->
            <header class="glass-panel border-b border-white/5 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                <div class="flex items-center gap-3">
                    <button onclick="toggleSidebar()" class="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    <h1 class="font-heading font-bold text-lg text-white">@yield('page_title', 'Dashboard')</h1>
                </div>

                <div class="flex items-center gap-3">
                    <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Backend API Live
                    </div>

                    <a href="{{ route('admin.leads.index') }}" class="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        @if(($newLeadsCount + $newConsultationsCount) > 0)
                            <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
                        @endif
                    </a>
                </div>
            </header>

            <!-- Alerts Banner -->
            <div class="px-4 md:px-8 pt-6">
                @if(session('success'))
                    <div class="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-sm">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            <span>{{ session('success') }}</span>
                        </div>
                        <button onclick="this.parentElement.remove()" class="text-emerald-400 hover:text-emerald-200">✕</button>
                    </div>
                @endif

                @if(session('error') || (isset($errors) && $errors->any()))
                    <div class="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                        <div class="flex items-center gap-2 mb-1">
                            <svg class="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="font-bold">Attention Needed:</span>
                        </div>
                        <ul class="list-disc pl-7 space-y-1">
                            @if(session('error')) <li>{{ session('error') }}</li> @endif
                            @if(isset($errors))
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            @endif
                        </ul>
                    </div>
                @endif
            </div>

            <!-- Page Content -->
            <main class="flex-1 px-4 md:px-8 pb-12">
                @yield('content')
            </main>
        </div>
    </div>

    <!-- Mobile Overlay -->
    <div id="sidebarOverlay" onclick="toggleSidebar()" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 hidden md:hidden"></div>

    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        }
    </script>
</body>
</html>
