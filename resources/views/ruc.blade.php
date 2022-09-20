@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <form method="GET" id="form-ruc">
                    <div class="form-group">
                        <label for="ruc" class="mb-2">N° de RUC</label>
                        <input type="text" class="form-control" maxlength="11" id="ruc">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-ruc">Apply</button>
                        <button class="btn btn-outline-secondary btn-block" type="reset" id="btn-ip">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-9" id="card-form">
        <div class="card">
            <div class="card-body mt-3">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="razon-social">Razon Social</label>
                            <input type="text" class="form-control" id="razon-social" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="nombre-comercial">Nombre Comercial</label>
                            <input type="text" class="form-control" id="nombre-comercial" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="act-economica">Act. Económica</label>
                            <input type="text" class="form-control" id="act-economica" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="ubigeo">Ubigeo</label>
                            <input type="text" class="form-control" id="ubigeo" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tipo">Tipo</label>
                            <input type="text" class="form-control" id="tipo" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="estado">Estado</label>
                            <input type="text" class="form-control" id="estado" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="condicion">Condición</label>
                            <input type="text" class="form-control" id="condicion" readonly>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="{{ asset('js/scripts/ruc.js')}}"></script>

@endpush
