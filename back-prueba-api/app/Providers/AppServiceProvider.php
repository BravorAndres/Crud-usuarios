<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;

  // Obtener la URL desde el archivo .env 
  $url = env('API_ENDPOINT');

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //url de la api
        $baseUrl = env('API_ENDPOINT');

        //registro de instancia unica del objeto client
        $this->app->singleton(Client::class, function($app) use ($baseUrl) {
            return new Client(['base_uri' => $baseUrl]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }


}
