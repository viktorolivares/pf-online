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
        sleep(3);

        $data = Ipconsult::search($ip);
        $test = Ip2Location::search($ip);

        return response()->json([
            'data' => $data,
            'ip' => $ip,
            'test' => $test,
        ]);
    }
}
