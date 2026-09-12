<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactSubmission;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        $submission = ContactSubmission::create([
            ...$request->safe()->except(['_gotcha', '_ts']),
            'ip'=> $request->ip(),
        ]);

        Mail::to(config('mail.contact_recipient'))
          ->send(new ContactFormSubmitted($submission));

        return back()->with('success', true);
    }
}
