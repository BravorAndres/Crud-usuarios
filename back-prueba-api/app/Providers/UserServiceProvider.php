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
        if ($this->app->runningInConsole()) {
            $this->commands([
                \App\Console\Commands\FetchAndStoreUserData::class,
            ]);
        }
    }
}
