<?php

use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

Route::get('/', function () {
   
    $client = new Client([
        // Base URI is used with relative requests
        'base_uri' => 'https://jsonplaceholder.typicode.com',
        // You can set any number of default request options.
        'timeout'  => 2.0,
    ]);

    $response = $client->request('GET','users');

    dd($response->getBody()->getContents());



    
});
