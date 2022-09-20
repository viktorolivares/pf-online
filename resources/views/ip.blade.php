@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h6 class="pb-4 text-primary">Máximo 1,000 Consultas diarias</h6>
                <form method="GET" id="form-ip">
                    <div class="form-group">
                        <textarea class="form-control" id="ip" rows="15"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-ip">Apply</button>
                        <button class="btn btn-outline-secondary btn-block" type="reset" id="btn-ip">Reset</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <div class="col-md-8" id="card-form">
        <div class="row">
            <div class="col-md-12 mb-2" id="progress">
                <div class="card">
                    <div class="card-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12" id="card-table">
                <div class="card">
                    <div class="card-body mb-2">
                        <div class="my-2">
                            <span id="msg-span" class="primary-bg">Consultar IP | 50 por Bloque</span>
                            <button class="btn btn-success btn-sm" id="btn-excel">
                                <i class="fa fa-file-excel"></i> &nbsp;
                                Exportar Excel
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover table-sm table-condensed" id="table-ip">
                                <thead class="thead-light">
                                    <tr>
                                        <th>IP</th>
                                        <th>País</th>
                                        <th>Region</th>
                                        <th>Ciudad</th>
                                        <th>Coordenadas 1</th>
                                        <th>Coordenadas 2</th>
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
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="js/jquery.table2excel.min.js"></script>
<script src="{{ asset('js/scripts/ip.js')}}"></script>

@endpush
