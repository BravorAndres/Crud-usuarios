<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use GuzzleHttp\Client;
use App\Models\User;



class UserController extends Controller
{
    
    //creacion del client guzzlehttp con inyeccion de dependiencias
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

    //Operaciones CRUD sobre la base de datos
    
    //Publucar los datos
    public function index(){
        return response()->json(User::all(),200);
    }

    //Publicar usuario por id
    public function show($id){
        $user = User::find($id);
        if ($user){
            return response()->json($user,200);
        }else{
            return response()->json(['message'=>'Usuario no encontrado'],400);
        }
    }

    //crear usuario nuevo
    public function store(StoreUserRequest $request){
        $user = User::create($request->validated());
        return response()->json($user, 201);
    }

    //actualizar usuario
    public function update(UpdateUserRequest $request, $id){

        $user = User::find($id);

        if ($user) {
            $user->update($request->validated());
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    //elimiar usuario
    public function destroy($id){
        $user = User::find($id);
        if($user){
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado'], 200);
        }else{
            return response()->json(['message'=>'Usuaro no encontrado',404]);
        }
    }
}
