<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

Route::inertia('/', 'home')->name('home');
Route::inertia('/home-alt', 'homeAlt')->name('home.alt');
Route::inertia('/welcome', 'welcome')->name('welcome');
// Route::inertia('/route', 'page_name')->name('alias');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/portfolio', 'portfolio')->name('portfolio');
Route::get('/portfolio/{slug}', function (string $slug) {
    return Inertia::render('portfolioCaseStudy', ['slug' => $slug]);
})->name('portfolio.show');
Route::inertia('/services', 'services')->name('services');
Route::inertia('/resume', 'resume')->name('resume');
Route::inertia('/contact', 'contact')->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
