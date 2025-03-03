<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
});

Route::get('/users',[UsersController::class,'index'])->name('users.index');
Route::post('/users', [UsersController::class, 'store'])->name('users.store');
Route::put('/users/{id}', [UsersController::class, 'update'])->name('users.update');
Route::delete('/users/{id}', [UsersController::class, 'destroy'])->name('users.destroy');



Route::resource('posts', PostController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
