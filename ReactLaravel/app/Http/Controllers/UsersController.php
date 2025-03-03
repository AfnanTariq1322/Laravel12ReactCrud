<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Response;

use Inertia\Inertia; 
class UsersController extends Controller
{
   public function index(): Response
   {
        $users = User::select('id','name','email','created_at')->latest()->paginate(10);
        return Inertia::render('users',[
            'users' => $users,
        ]);
   }

   public function destroy($id) 
   {
        User::findOrFail($id)->delete();
        return redirect()->route('users.index');
   }


   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
    ]);

    User::create($request->only('name', 'email'));

    return redirect()->route('users.index');
}

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
    ]);

    $user->update($request->only('name', 'email'));

    return redirect()->route('users.index');
}

}
