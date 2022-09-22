<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class TipoCambio
{
    public static function search($date)
    {

        $token = 'apis-token-2870.qITMo09U6v-46yx96I54xGUmah15pwt9';

        $client = new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);
        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Referer' => 'https://apis.net.pe/api-sunat-tipo-de-cambio',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => ['fecha' => $date]
        ];
        $res = $client->request('GET', '/v1/tipo-cambio-sunat', $parameters);
        $response = json_decode($res->getBody()->getContents(), true);

        return response()->json($response);
    }

    public static function searchMonth($month, $year)
    {

        $token = 'apis-token-2870.qITMo09U6v-46yx96I54xGUmah15pwt9';

        $client = new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);
        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Referer' => 'https://apis.net.pe/api-sunat-tipo-de-cambio',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => ['month' => $month, 'year' => $year]
        ];
        $res = $client->request('GET', '/v1/tipo-cambio-sunat', $parameters);
        $response = json_decode($res->getBody()->getContents(), true);

        return response()->json($response);
    }
}
