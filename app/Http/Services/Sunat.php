<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class Sunat
{
    public static function search($dni)
    {
        if (strlen($dni) !== 8) {
            return [
                'success' => false,
                'message' => 'DNI debe contener 8 dígitos.'
            ];
        }

        $client = new Client(['base_uri' => 'https://ww1.sunat.gob.pe/', 'verify' => false]);

        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => [
                'tipDocu' => 1,
                'numDocu'=> $dni
            ]
        ];

        $data = $client->request('POST', 'ol-ti-itatencionf5030/registro/solicitante', $parameters);

        if (!$data) {
            return response()->json(["error" => 404]);
        }

        $response = json_decode($data->getBody()->getContents(), true);

        return response()->json($response);
    }
}
