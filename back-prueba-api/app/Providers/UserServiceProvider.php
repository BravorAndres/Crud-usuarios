<?php

namespace App\Providers;

use App\Http\Controllers\UserController;
use Illuminate\Support\ServiceProvider;



class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //llamado a la fucion para guardar los datos con cada inicio de la aplicacion
        $userController = app(UserController::class);
        $userController->fetchAndStoreData();
    }
}
