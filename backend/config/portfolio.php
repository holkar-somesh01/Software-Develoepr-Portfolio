<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Portfolio Admin & Contact Configuration
    |--------------------------------------------------------------------------
    |
    | All contact details, administrative settings, and notifications are
    | loaded directly from environment variables.
    |
    */

    'owner_name' => env('ADMIN_DEFAULT_NAME', env('MAIL_FROM_NAME', 'Administrator')),
    'admin_email' => env('ADMIN_DEFAULT_EMAIL', env('MAIL_FROM_ADDRESS')),
    'admin_password' => env('ADMIN_DEFAULT_PASSWORD'),
    'contact_email' => env('ADMIN_CONTACT_EMAIL', env('MAIL_FROM_ADDRESS')),
    'contact_phone' => env('ADMIN_CONTACT_PHONE', ''),
    'whatsapp_number' => env('ADMIN_WHATSAPP_NUMBER', ''),
    'notification_email' => env('ADMIN_NOTIFICATION_EMAIL', env('MAIL_FROM_ADDRESS')),
];
