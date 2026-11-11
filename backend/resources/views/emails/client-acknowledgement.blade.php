<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - Someshwar Holkar</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f; padding: 30px 15px;">
        <tr>
            <td align="center">
                <!-- Container Card -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #12121c; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <div style="display: inline-block; padding: 6px 12px; background-color: rgba(0, 212, 255, 0.12); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; font-weight: 800; font-size: 13px; color: #00d4ff; letter-spacing: 1px;">
                                            &lt;/&gt; SOMESHWAR HOLKAR
                                        </div>
                                    </td>
                                    <td align="right">
                                        <span style="font-size: 12px; color: #94a3b8; font-weight: 500;">Inquiry Acknowledged</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 36px 32px 24px 32px;">
                            <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                                Hello {{ $lead->name }},
                            </h2>
                            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                                Thank you for reaching out through my software engineering portfolio. I have successfully received your inquiry and I appreciate your interest in collaborating.
                            </p>

                            <!-- Submission Summary Box -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0b12; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; margin: 24px 0; padding: 20px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 11px; font-weight: 700; color: #00d4ff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                                            Summary of Your Request
                                        </div>

                                        @if($type === 'consultation')
                                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
                                                <strong style="color: #f1f5f9;">Service Requested:</strong> {{ $lead->project_type ?? 'Software Consultation' }}
                                            </div>
                                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
                                                <strong style="color: #f1f5f9;">Budget:</strong> {{ $lead->budget ?? 'To be discussed' }}
                                            </div>
                                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
                                                <strong style="color: #f1f5f9;">Expected Timeline:</strong> {{ $lead->timeline ?? 'Standard' }}
                                            </div>
                                            @if($lead->details)
                                                <div style="font-size: 13px; color: #94a3b8; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                                                    <strong style="color: #f1f5f9;">Project Details:</strong>
                                                    <div style="color: #e2e8f0; margin-top: 4px; font-style: italic;">"{{ $lead->details }}"</div>
                                                </div>
                                            @endif
                                        @else
                                            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
                                                <strong style="color: #f1f5f9;">Subject:</strong> {{ $lead->subject }}
                                            </div>
                                            <div style="font-size: 13px; color: #94a3b8; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                                                <strong style="color: #f1f5f9;">Your Message:</strong>
                                                <div style="color: #e2e8f0; margin-top: 4px; font-style: italic;">"{{ $lead->message }}"</div>
                                            </div>
                                        @endif
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                                I am currently reviewing your requirements and will get back to you with next steps, available timeline slots, or a project proposal shortly (typically within <strong>12 to 24 hours</strong>).
                            </p>

                            @if(config('portfolio.contact_phone'))
                            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                                If you have urgent questions or prefer instant messaging, feel free to connect directly via WhatsApp or phone at <strong style="color: #38bdf8;">{{ config('portfolio.contact_phone') }}</strong>.
                            </p>
                            @endif

                            @if(config('portfolio.whatsapp_number'))
                            <!-- Direct Action Button -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0 10px 0;">
                                <tr>
                                    <td align="center" style="border-radius: 10px; background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);">
                                        <a href="https://wa.me/{{ config('portfolio.whatsapp_number') }}?text={{ urlencode('Hi ' . (config('portfolio.owner_name') ?: 'there') . ', I just submitted an inquiry on your portfolio!') }}" target="_blank" style="display: inline-block; padding: 13px 26px; font-size: 14px; font-weight: 700; color: #0a0a0f; text-decoration: none; border-radius: 10px;">
                                            Chat on WhatsApp &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            @endif
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px 32px 32px; background-color: #0b0b12; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                            <div style="font-size: 14px; font-weight: 700; color: #f8fafc;">
                                {{ config('portfolio.owner_name', 'Full-Stack Developer') }}
                            </div>
                            <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">
                                Full-Stack Software Developer & Mobile Specialist
                            </div>
                            @if(config('portfolio.contact_email'))
                            <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
                                {{ config('portfolio.contact_email') }}
                            </div>
                            @endif
                            <div style="margin-top: 16px; font-size: 11px; color: #475569; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
                                This is an automated confirmation sent from {{ config('portfolio.owner_name', 'Portfolio') }}'s Portfolio System. You can reply directly to this email to reach me.
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

