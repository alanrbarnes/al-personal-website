<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="description" content="Alan Barnes — Full-Stack Software Engineer specializing in .NET Core, C#, Angular, and React. Portfolio, resume, and freelance web development services.">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Alan Barnes">
        <meta property="og:title" content="Alan Barnes — Full-Stack Software Engineer">
        <meta property="og:description" content="Full-stack engineer specializing in .NET Core, C#, Angular, and React — from 20 years in manufacturing to building production web applications and APIs.">
        <meta property="og:image" content="{{ asset('images/personal_pic_st_louis_1200-630_1.jpg') }}">
        <meta property="og:url" content="{{ url()->current() }}">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Alan Barnes — Full-Stack Software Engineer">
        <meta name="twitter:description" content="Full-stack engineer specializing in .NET Core, C#, Angular, and React.">
        <meta name="twitter:image" content="{{ asset('images/personal_pic_st_louis_1200-630_1.jpg') }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="stylesheet" href="/css/custom.css">
        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Barnes Web Services') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
