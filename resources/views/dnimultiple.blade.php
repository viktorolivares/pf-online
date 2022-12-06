@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-md-3 mb-2">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-primary">Máximo 1,000 Consultas</div>
                <form method="GET" id="form-dni">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">N° de DNI</label>
                        <textarea class="form-control" id="dni" rows="12"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-dni">Apply</button>
                        <button class="btn btn-outline-secondary btn-block" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-12 mb-1" id="card-table">
                <div class="card">
                    <div class="card-body mb-1">
                        <div class="my-2">
                            <span id="msg-span">
                                <i class="fa fa-info-circle"></i>
                                El origen de datos depende del padrón reducido SUNAT y otras fuentes públicas consultadas en tiempo real.
                            </span>
                            <button class="btn btn-success btn-sm float-end" id="btn-excel" style="display: none">
                                <i class="fa fa-file-excel"></i> &nbsp;
                                Exportar Excel
                            </button>
                        </div>
                        <div class="table-responsive-md">
                            <table class="table table-bordered table-hover table-condensed" id="table-dni" style="display: none">
                                <thead class="thead-light">
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido Paterno</th>
                                        <th>Apellido Materno</th>
                                        <th>Código de Verf.</th>
                                    </tr>
                                </thead>
                                <tbody id="body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12" id="progress" style="display: none">
                <div class="card">
                    <div class="card-body">
                        <div class="progress my-1">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="{{ asset('js/jquery.table2excel.min.js')}}"></script>
<script src="{{ asset('js/scripts/dnimultiple.js')}}"></script>

@endpush
