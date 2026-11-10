@extends('admin.layouts.app')

@section('title', 'Security & Account Profile')
@section('page_title', 'Admin Account & Security')

@section('content')
<div class="max-w-4xl space-y-6">
    <!-- Header -->
    <div>
        <h2 class="text-xl font-bold text-white font-heading">Security & Account Settings</h2>
        <p class="text-xs text-slate-400 mt-1">Manage your administrator account details, email address, and login password.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Form Column -->
        <div class="lg:col-span-2 space-y-6">
            <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
                <form method="POST" action="{{ route('admin.profile.update') }}" class="space-y-6">
                    @csrf

                    <!-- Profile Information Section -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 pb-2 border-b border-white/5">
                            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Account Credentials</h3>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Admin Full Name</label>
                            <input type="text" name="name" value="{{ old('name', $user->name) }}" required
                                   class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Admin Email Address (Login ID)</label>
                            <input type="email" name="email" value="{{ old('email', $user->email) }}" required
                                   class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>
                    </div>

                    <!-- Password Update Section -->
                    <div class="space-y-4 pt-4 border-t border-white/5">
                        <div class="flex items-center gap-2 pb-2 border-b border-white/5">
                            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Change Password</h3>
                        </div>
                        <p class="text-xs text-slate-400">Leave these blank if you do not wish to change your current login password.</p>

                        <div>
                            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Current Password</label>
                            <input type="password" name="current_password" autocomplete="current-password" placeholder="Enter current password to authorize changes"
                                   class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-1.5">New Password</label>
                                <input type="password" name="new_password" autocomplete="new-password" placeholder="At least 8 characters"
                                       class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors">
                            </div>

                            <div>
                                <label class="block text-xs font-semibold text-slate-300 mb-1.5">Confirm New Password</label>
                                <input type="password" name="new_password_confirmation" autocomplete="new-password" placeholder="Re-enter new password"
                                       class="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors">
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-4 flex items-center justify-end">
                        <button type="submit" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm transition-all shadow-lg shadow-cyan-500/20">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Info Column -->
        <div class="space-y-6">
            <!-- Account Info Card -->
            <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xl font-heading">
                    {{ strtoupper(substr($user->name, 0, 1)) }}
                </div>
                <div>
                    <h4 class="font-bold text-white text-base font-heading">{{ $user->name }}</h4>
                    <p class="text-xs text-slate-400">{{ $user->email }}</p>
                    <span class="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Primary Super Administrator
                    </span>
                </div>
                <div class="pt-4 border-t border-white/5 text-xs text-slate-400 space-y-2">
                    <div class="flex items-center justify-between">
                        <span>Account ID:</span>
                        <span class="text-white font-mono">#{{ $user->id }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>Registered On:</span>
                        <span class="text-white">{{ $user->created_at->format('M d, Y') }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>Session IP:</span>
                        <span class="text-white font-mono">{{ request()->ip() }}</span>
                    </div>
                </div>
            </div>

            <!-- Security Notice -->
            <div class="glass-panel rounded-2xl p-5 border border-cyan-500/20 bg-cyan-950/20 space-y-2">
                <div class="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    Security Best Practices
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                    Protect this administrator login URL (<code class="text-cyan-300">/admin/login</code>). Passwords use bcrypt hashing with rate-limited login defense (5 attempts per minute).
                </p>
            </div>
        </div>
    </div>
</div>
@endsection

