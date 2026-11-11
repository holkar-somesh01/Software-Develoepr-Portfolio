<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $mailSubject }}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f; padding: 30px 15px;">
        <tr>
            <td align="center">
                <!-- Container Card -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #12121c; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 28px 32px; background: linear-gradient(135deg, rgba(0, 212, 255, 0.18) 0%, rgba(124, 58, 237, 0.2) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <div style="display: inline-block; padding: 6px 12px; background-color: rgba(0, 212, 255, 0.15); border: 1px solid rgba(0, 212, 255, 0.4); border-radius: 8px; font-weight: 800; font-size: 13px; color: #00d4ff; letter-spacing: 1px;">
                                            &lt;/&gt; SOMESHWAR HOLKAR
                                        </div>
                                    </td>
                                    <td align="right">
                                        <span style="font-size: 12px; color: #cbd5e1; font-weight: 600;">Personal Response</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 36px 32px 28px 32px;">
                            <h2 style="margin: 0 0 18px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                                Hello {{ $recipientName }},
                            </h2>

                            <!-- The Custom Message Body from Admin -->
                            <div style="font-size: 15px; line-height: 1.7; color: #cbd5e1; margin-bottom: 24px; white-space: pre-wrap;">
{!! nl2br(e($mailMessage)) !!}
                            </div>

                            <!-- Interactive Call to Action -->
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0 10px 0;">
                                <tr>
                                    <td align="center" style="border-radius: 10px; background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);">
                                        <a href="mailto:someshwarsholkar22@gmail.com?subject=Re: {{ rawurlencode($mailSubject) }}" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: 700; color: #0a0a0f; text-decoration: none; border-radius: 10px; background-color: #00d4ff;">
                                            Reply to This Email &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Someshwar Holkar Signature Block -->
                    <tr>
                        <td style="padding: 24px 32px 32px 32px; background-color: #0b0b12; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="56" valign="top">
                                        <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); font-weight: 800; font-size: 20px; color: #0a0a0f; text-align: center; line-height: 48px;">
                                            SH
                                        </div>
                                    </td>
                                    <td valign="top" style="padding-left: 14px;">
                                        <div style="font-size: 15px; font-weight: 700; color: #ffffff;">Someshwar Holkar</div>
                                        <div style="font-size: 13px; color: #00d4ff; margin-top: 2px;">Software Developer & Consultant</div>
                                        <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
                                            Email: <a href="mailto:someshwarsholkar22@gmail.com" style="color: #38bdf8; text-decoration: none;">someshwarsholkar22@gmail.com</a> | Phone: <a href="tel:+918482816761" style="color: #38bdf8; text-decoration: none;">+91 84828 16761</a>
                                        </div>
                                        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
                                            Portfolio: <a href="https://someshwar-portfolio.com" target="_blank" style="color: #a855f7; text-decoration: none;">Explore Portfolio & Case Studies</a>
                                        </div>
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

