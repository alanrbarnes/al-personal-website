<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'path' => ['required', Rule::in(['hiring', 'freelance'])],
            'name' => ['required', 'string', 'min:2'],
            'email' => ['required', 'email'],
            'message' => ['required', 'string', 'min:10'],

            'company' => ['required_if:path,hiring', 'nullable', 'string', 'min:2'],
            'role' => ['required_if:path,hiring', 'nullable', 'string', 'min:2'],
            
            'project_type' => ['required_if:path,freelance', 'nullable', 'string', 'min:2'],
            'budget' => ['required_if:path,freelance', 'nullable', 'string'],

            //Honeypot - real users do not fill this in
            '_gotcha' => ['prohibited'],
            // Timestamp
            '_ts' => ['required', 'integer'],

        ];
    }

    /**
     * Reject submissions that arrive faster than a human could plausibly fill the form.
     */
    protected function passedValidation(): void
    {
        if ((time() * 1000 - $this->integer('_ts')) < 2000) {
            abort(422, 'Too fast.');
        }
    }
}
