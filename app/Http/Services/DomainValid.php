<?php

namespace App\Http\Services;



class DomainValid
{

    public static function search($URL)
    {

        $key = 'R6XtJ6zztFZLBoz50cl93kde3uwgAeT3';

        // Adjustable strictness level from 0 to 2. 0 is the least strict and recommended for most use cases. Higher strictness levels can increase false-positives.
        $strictness = 0;

        // Create parameters array.
        $parameters = array(
            'strictness' => $strictness
        );

        // Format Parameters
        $formatted_parameters = http_build_query($parameters);

        // Create API URL
        $url = sprintf(
            'https://www.ipqualityscore.com/api/json/url/%s/%s?%s',
            $key,
            urlencode($URL),
            $formatted_parameters
        );

        // Fetch The Result
        $timeout = 5;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $timeout);

        $json = curl_exec($curl);
        curl_close($curl);

        // Decode the result into an array.
        $result = json_decode($json, true);

        return response()->json($result);


    }
}
