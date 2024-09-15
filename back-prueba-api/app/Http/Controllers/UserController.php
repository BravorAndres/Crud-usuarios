<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\User;



class UserController extends Controller
{
    
    //creacion del client con inyeccion de dependiencias
    protected $client;
    public function __construct(Client $client){
        $this->client= $client;
    }
    

    //obtener y guardar datos de la api
    public function fetchAndStoreData(){

        //recuperacion de los datos
        $response = $this->client->request('GET','users');
        $data = json_decode($response->getBody(),true);

        //almacenado en la base de datos
        foreach ($data as $datos){
            $users = $this->aplanarDatos($datos);
            User::updateOrCreate(
                ['id' => $users['id']],
                [
                    'name' => $users['name'],
                    'username' => $users['username'],
                    'email' => $users['email'],
                    'address_city' => $users['address'],
                    'phone' => $users['phone'],
                    'website' => $users['website'],
                    'company_name' => $users['company'],
                    'company_bs' => $users['companybs']
                ]
            );
        }
    }


    //aplana json para que conincida con el formato de la base de datos
    private function aplanarDatos($data){

        // Convertir address a texto plano
        $address = $data['address'];
        $addressPlain = sprintf(
            "%s - %s - %s -",
            $address['street'],
            $address['suite'],
            $address['city'],
           // $address['zipcode'],
           // $address['geo']['lat'],
           // $address['geo']['lng']
            );

        // Convertir company a texto plano
        $company = $data['company'];
        $companyPlain = sprintf(
            "%s - %s",
            $company['name'],
            $company['catchPhrase'],
         );

        $companyBs = $company['bs'];

        // Reemplazar address y company en el array con su versión en texto plano
        $data['address'] = $addressPlain;
        $data['company'] = $companyPlain;
        $data['companybs'] = $companyBs;

    return $data;
    }

}
