<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class ApiSunat
{
    public static function search($ruc)
    {
        if (strlen($ruc) !== 11) {
            return [
                'success' => false,
                'message' => 'RUC debe contener 11 dígitos.'
            ];
        }


        $token = 'apis-token-2870.qITMo09U6v-46yx96I54xGUmah15pwt9';

        $client = new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);

        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Referer' => 'https://apis.net.pe/api-consulta-ruc',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => ['numero' => $ruc]
        ];
        $res = $client->request('GET', '/v1/ruc', $parameters);
        $response = json_decode($res->getBody()->getContents(), true);

        return response()->json($response);
    }
}
