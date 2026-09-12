<x-mail::message>
# New {{ $submission->path === 'hiring' ? 'Job Opportunity' : 'Freelance Project' }} Inquiry

**From:** {{ $submission->name }} ({{ $submission->email }})

@if($submission->path === 'hiring')
**Company:** {{ $submission->company }}
**Role:** {{ $submission->role }}
@else
**Project type:** {{ $submission->project_type }}
**Budget:** {{ $submission->budget }}
@endif

**Message:**

{{ $submission->message }}

<x-mail::button :url="'mailto:' . $submission->email">
Reply to {{ $submission->name }}
</x-mail::button>
</x-mail::message>
