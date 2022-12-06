@extends('layouts.app')

@push('styles')
<link rel="stylesheet" href="{{ asset('vendor/leaflet/leaflet.css') }}">
@endpush

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-primary">Máximo 100 Consultas</div>
                <small class="card-subtitle text-muted pb-4">[Consultas máximas por día 1000]</small>
                <form method="GET" id="form-ip">
                    <div class="form-group">
                        <textarea class="form-control" id="ip" rows="15"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-ip">Apply</button>
                        <button class="btn btn-outline-secondary btn-block" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <div class="col-md-9" id="card-form">
        <div class="row">
            <div class="col-md-12 mb-1" id="progress" style="display: none">
                <div class="card">
                    <div class="card-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12" id="card-table">
                <div class="card">
                    <div class="card-body mb-1">
                        <div class="my-2">
                            <span id="msg-span">
                                API (https://ipapi.co/) para geolocalización de direcciones IP
                            </span>
                            <button class="btn btn-success btn-sm float-end" id="btn-excel" style="display: none">
                                <i class="fa fa-file-excel"></i> &nbsp;
                                Exportar Excel
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-condensed" id="table-ip" style="display: none">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>IP</th>
                                        <th>Country</th>
                                        <th>Flag</th>
                                        <th>City [1]</th>
                                        <th>Province [1]</th>
                                        <th>Coord. [1]</th>
                                        <th>Red</th>
                                        <th>Operador</th>
                                    </tr>
                                </thead>
                                <tbody id="body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card p-4" id="view-maps" style="display: none">
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="{{ asset('js/jquery.table2excel.min.js')}}"></script>
<script src="{{ asset('vendor/leaflet/leaflet.js')}}"></script>
<script src="{{ asset('js/scripts/ip.js')}}"></script>

@endpush
