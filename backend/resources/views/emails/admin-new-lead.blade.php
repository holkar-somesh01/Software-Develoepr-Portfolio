<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f; padding: 30px 15px;">
        <tr>
            <td align="center">
                <!-- Container Card -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #12121c; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 24px 32px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 212, 255, 0.15) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <div style="font-size: 11px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 1.5px;">
                                            🚨 NEW PORTFOLIO LEAD ALERT
                                        </div>
                                        <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-top: 4px;">
                                            {{ $lead->name }} has reached out!
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 32px 32px 24px 32px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;" width="140">
                                        Client Name:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #ffffff;">
                                        {{ $lead->name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;">
                                        Email:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #38bdf8;">
                                        <a href="mailto:{{ $lead->email }}" style="color: #38bdf8; text-decoration: none;">{{ $lead->email }}</a>
                                    </td>
                                </tr>
                                @if(!empty($lead->phone))
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;">
                                        Phone / WhatsApp:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #10b981;">
                                        <a href="tel:{{ $lead->phone }}" style="color: #10b981; text-decoration: none;">{{ $lead->phone }}</a>
                                    </td>
                                </tr>
                                @endif
                                @if($type === 'consultation')
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;">
                                        Project Type:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #c084fc;">
                                        {{ $lead->project_type ?? 'N/A' }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;">
                                        Budget / Timeline:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #f59e0b;">
                                        {{ $lead->budget ?? 'Flexible' }} (Timeline: {{ $lead->timeline ?? 'Standard' }})
                                    </td>
                                </tr>
                                @else
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #94a3b8;">
                                        Subject:
                                    </td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; font-weight: 600; color: #ffffff;">
                                        {{ $lead->subject }}
                                    </td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding: 8px 0; font-size: 13px; color: #94a3b8;">
                                        Received:
                                    </td>
                                    <td style="padding: 8px 0; font-size: 13px; color: #94a3b8; font-family: monospace;">
                                        {{ $lead->created_at->format('M d, Y • h:i A') }} (IP: {{ $lead->ip_address }})
                                    </td>
                                </tr>
                            </table>

                            <div style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">
                                Inquired Message:
                            </div>
                            <div style="background-color: #0b0b12; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e2e8f0; margin-bottom: 24px; white-space: pre-wrap;">
{{ $type === 'consultation' ? ($lead->details ?: 'No details provided.') : $lead->message }}
                            </div>

                            <!-- Action button to Admin Panel -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border-radius: 10px; background: #00d4ff;">
                                        <a href="{{ url('/admin/' . ($type === 'consultation' ? 'consultations' : 'leads')) }}" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 700; color: #0a0a0f; text-decoration: none; border-radius: 10px;">
                                            Open in Admin Panel &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

