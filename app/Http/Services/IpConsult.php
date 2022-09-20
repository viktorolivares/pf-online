<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class IpConsult
{
    public static function search($ip)
    {
        $client = new Client(['base_uri' => 'https://ipapi.co/', 'verify' => false]);

        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
        ];

        $data = $client->request('GET', $ip.'/json/', $parameters);

        if (!$data) {
            return response()->json(["error" => 404]);
        }

        $response = json_decode($data->getBody()->getContents(), true);

        return response()->json($response);
    }
}
