@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-md-4 mb-4">
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
                        <button class="btn btn-outline-secondary btn-block" type="reset" id="btn-ip">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-12 mb-3" id="card-table">
                <div class="card">
                    <div class="card-body mb-2">
                        <div class="my-2">
                            <span id="msg-span" class="primary-bg">Consultar Dni </span>
                            <button class="btn btn-success btn-sm" id="btn-excel">
                                <i class="fa fa-file-excel"></i> &nbsp;
                                Exportar Excel
                            </button>
                        </div>
                        <div class="table-responsive-md">
                            <table class="table table-bordered table-hover table-sm table-condensed" id="table-dni">
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
            <div class="col-md-12" id="progress">
                <div class="card">
                    <div class="card-body">
                        <div class="progress my-4">
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

<script src="js/jquery.table2excel.min.js"></script>
<script src="{{ asset('js/scripts/dnimultiple.js')}}"></script>

@endpush
