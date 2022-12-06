<?php

namespace App\Http\Controllers;

use App\Http\Services\DomainValid;


class DomainController extends Controller
{
    public function domain(){
        return view('domain');
    }

    public function getDomain($domain) {

        $result = DomainValid::search($domain);

        return response()->json([
            'data' => $result,
            'domain' => $domain,
        ]);

    }
}
