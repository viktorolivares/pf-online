<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class Ip2Location
{
    public static function search($ip)
    {
        $client = new Client(['base_uri' => 'https://api.ip2location.io/', 'verify' => false]);

        $key = 'cb549c1421a8d8c20a332fdb17b661d2';

        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => [
                'ip'      => $ip,
                'key'     => $key,
                'format' => 'json',
            ]
        ];

        $data = $client->request('GET', '', $parameters);

        if (!$data) {
            return response()->json(["error" => 404]);
        }

        $response = json_decode($data->getBody()->getContents(), true);

        return response()->json($response);
    }
}
