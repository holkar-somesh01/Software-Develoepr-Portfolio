@extends('admin.layouts.app')

@section('title', 'Security & Email Settings')
@section('page_title', 'Admin Account & Email Configuration')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div>
        <h2 class="text-xl font-bold text-white font-heading">Security & Email Configuration</h2>
        <p class="text-xs text-slate-400 mt-1">Manage administrator credentials, inspect active SMTP mail settings, and test outgoing client email delivery.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Column: Profile & Credentials Update Form (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
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

            <!-- Email Setup Guide -->
            <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                <div class="flex items-center gap-2 pb-2 border-b border-white/5">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider">How to Set Up Your Gmail App Password</h3>
                </div>
                <div class="text-xs text-slate-300 space-y-2.5 leading-relaxed">
                    <p>To allow this admin panel to send real emails to your clients through your Gmail address, use a secure Google <strong>App Password</strong>:</p>
                    <ol class="list-decimal pl-5 space-y-1.5 text-slate-400">
                        <li>Visit your <a href="https://myaccount.google.com/security" target="_blank" class="text-cyan-400 underline font-semibold">Google Account Security page</a>.</li>
                        <li>Ensure <strong>2-Step Verification</strong> is switched ON.</li>
                        <li>Search for <strong>"App passwords"</strong> in the search bar.</li>
                        <li>Create a new App Password named <code class="text-white bg-black/60 px-1.5 py-0.5 rounded">Portfolio Admin</code>.</li>
                        <li>Google will generate a <strong>16-character code</strong> (e.g. <code class="text-emerald-400 font-mono">abcd efgh ijkl mnop</code>).</li>
                        <li>Open <code class="text-cyan-300">backend/.env</code> in your editor and set:
                            <pre class="mt-1.5 p-2.5 rounded-lg bg-black/70 text-slate-300 font-mono text-[11px] overflow-x-auto border border-white/5">MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_gmail_address@gmail.com
MAIL_PASSWORD=your_16_character_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_gmail_address@gmail.com
MAIL_FROM_NAME="Portfolio Admin"</pre>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- Right Column: Live SMTP Status & Test Email (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
            <!-- Account Info Card -->
            <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xl font-heading">
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-base font-heading">{{ $user->name }}</h4>
                        <p class="text-xs text-slate-400">{{ $user->email }}</p>
                    </div>
                </div>
                <div class="pt-3 border-t border-white/5 text-xs text-slate-400 space-y-2">
                    <div class="flex items-center justify-between">
                        <span>Account Role:</span>
                        <span class="text-cyan-300 font-semibold">Super Administrator</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>Database ID:</span>
                        <span class="text-white font-mono">#{{ $user->id }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>Current Session IP:</span>
                        <span class="text-white font-mono">{{ request()->ip() }}</span>
                    </div>
                </div>
            </div>

            <!-- Active SMTP Configuration Card -->
            <div class="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                        <h3 class="text-xs font-bold text-white uppercase tracking-wider">Active SMTP Mailer</h3>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                        {{ strtoupper(config('mail.default', 'smtp')) }}
                    </span>
                </div>

                <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Host:</span>
                        <span class="text-white font-mono font-medium">{{ config('mail.mailers.smtp.host') ?: 'smtp.gmail.com' }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Port / Encryption:</span>
                        <span class="text-white font-mono font-medium">{{ config('mail.mailers.smtp.port', 587) }} ({{ strtoupper(config('mail.mailers.smtp.encryption', 'tls')) }})</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Username:</span>
                        <span class="text-white font-mono truncate max-w-[180px]">{{ config('mail.mailers.smtp.username') ?: 'Not configured' }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Password:</span>
                        <span class="font-mono {{ config('mail.mailers.smtp.password') ? 'text-emerald-400' : 'text-amber-400' }}">
                            {{ config('mail.mailers.smtp.password') ? '••••••••••••' : 'Missing / Placeholder' }}
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400">Sender "From":</span>
                        <span class="text-white font-mono truncate max-w-[180px]">{{ config('mail.from.address') }}</span>
                    </div>
                </div>

                <!-- One-Click SMTP Test Form -->
                <form method="POST" action="{{ route('admin.email.test') }}" class="pt-2 border-t border-white/5 space-y-3">
                    @csrf
                    <div>
                        <label class="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Verify Email Delivery
                        </label>
                        <input type="email" name="test_email" value="{{ old('test_email', $user->email) }}" required placeholder="recipient@example.com"
                               class="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500">
                    </div>
                    <button type="submit" class="w-full px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors flex items-center justify-center gap-2">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        <span>Send Test Email Now</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
