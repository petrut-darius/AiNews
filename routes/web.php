<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $layout = (Auth::check() ? "auth" : "guest");

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        "layout" => $layout,
        "appName" => config("app.name"),
    ]);
})->name("home");//pt ca asta era dashboard da l-am schimbat, se rezorva lejer

Route::get("/articles", ArticlesController::class)->name("articles.index");

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
