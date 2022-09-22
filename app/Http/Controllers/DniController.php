<?php

namespace App\Http\Controllers;

use App\Http\Services\Sunat;
use App\Http\Services\Jne;
use App\Http\Services\Oefa;

class DniController extends Controller
{

    public function dniMultiple()
    {
        return view('dnimultiple');
    }

    public function dni()
    {
        return view('dni');
    }

    public function services()
    {
        return view('services');
    }

    public function age()
    {
        return view('age');
    }

    public function getDni($dni)
    {

        sleep(2);

        $sunat = Sunat::search($dni);
        $oefa = Oefa::search($dni);
        $jne = Jne::search($dni);
        $verifyCode = $this->getVerifyCode($dni);

        return response()->json([
            'codigoV' => $verifyCode,
            'sunat' => $sunat,
            'oefa' => $oefa,
            'jne' => $jne,
            'dni' => $dni
        ]);
    }


    public function getDniMultiple($dni)
    {
        sleep(2);

        $sunat = Sunat::search($dni);
        $jne = Jne::search($dni);
        $verifyCode = $this->getVerifyCode($dni);

        return response()->json([
            'codigoV' => $verifyCode,
            'sunat' => $sunat,
            'jne' => $jne,
            'dni' => $dni
        ]);

    }


    private function getVerifyCode($dni)
    {
        if (is_numeric($dni) && strlen($dni) == 8) {
            $suma = 5;
            $len = strlen($dni);
            $hash = [3, 2, 7, 6, 5, 4, 3, 2];

            for ($i = 0; $i < $len; ++$i) {
                $suma += $dni[$i] * $hash[$i];
            }

            $entero = (int) ($suma / 11);
            $digito = 11 - ($suma - $entero * 11);

            return $digito > 9 ? $digito - 10 : $digito;
        } else {
            return response()->json("Error en Número de DNI");
        }

    }

}
