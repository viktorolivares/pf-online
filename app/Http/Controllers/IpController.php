<?php

namespace App\Http\Controllers;

use App\Http\Services\Ipconsult;
use App\Http\Services\Ip2Location;

class IpController extends Controller
{
    public function ip()
    {
        return view('IP');
    }

    public function ipConsult($ip)

    {

        $data = Ipconsult::search($ip);

        $data1 = Ip2Location::search($ip);

        return response()->json([
            'data' => $data,
            'ip' => $ip,
            'data1' => $data1,
        ]);
    }
}
