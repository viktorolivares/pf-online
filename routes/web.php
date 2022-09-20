<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IpController;
use App\Http\Controllers\DniController;
use App\Http\Controllers\RucController;
use App\Http\Controllers\OddsController;
use App\Http\Controllers\DashboardController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['register' => false]);


Route::group(['middleware' => ['auth']], function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    /*Consultas DNI*/
    Route::get('/dni', [DniController::class, 'dni'])->name('dni');
    Route::get('/age', [DniController::class, 'age'])->name('age');
    Route::get('/services', [DniController::class, 'services'])->name('services');
    Route::get('/dni/{number}', [DniController::class, 'getDni'])->name('consulta-dni');
    Route::get('/dnimultiple', [DniController::class, 'dniMultiple'])->name('dni-multiple');


    /*Consultas Ruc*/
    Route::get('/ruc', [RucController::class, 'ruc'])->name('ruc');
    Route::get('/ruc/{number}', [RucController::class, 'getRuc'])->name('consulta-ruc');

    /*Web Scraping*/
    Route::get('/odds', [OddsController::class, 'index'])->name('odds');
    Route::get('/queryodds', [OddsController::class, 'odds'])->name('query-odds');


    /* Consulta IP*/

    Route::get('/ip', [IpController::class, 'ip'])->name('ip');
    Route::get('/ip-consult/{ip}', [IpController::class, 'ipConsult'])->name('ip-consult');
});
