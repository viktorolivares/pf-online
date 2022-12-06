@extends('layouts.app')

@section('content')

<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-primary">Número de DNI:</div>
                <form method="GET" id="form-dni">
                    <div class="form-group">
                        <input type="text" class="form-control" maxlength="8" id="dni">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-dni">Apply</button>
                        <button class="btn btn-outline-secondary btn-block" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-9" id="card-form" style="display: none">
        <div class="card">
            <div class="card-body pt-4">
                <form id="form-result">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="name">Nombre</label>
                            <input type="text" class="form-control" id="name" readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="lastname1">Apellido Paterno</label>
                            <input type="text" class="form-control" id="lastname1" readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="lastname2">Apellido Materno</label>
                            <input type="text" class="form-control" id="lastname2" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="status">Estado Civil</label>
                            <input type="text" class="form-control" id="status" readonly>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="sex">Genero</label>
                            <input type="text" class="form-control" id="sex" readonly>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="age">Edad</label>
                            <input type="text" class="form-control" id="age" readonly>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="code">Código de Verf.</label>
                            <input type="text" class="form-control" id="code" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="date">Fecha Nac.</label>
                            <input type="text" class="form-control" id="date" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="address">Dirección</label>
                            <input type="text" class="form-control" id="address" readonly>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="ubigeo">Ubigeo</label>
                            <input type="text" class="form-control" id="ubigeo" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="department">Departamento</label>
                            <input type="text" class="form-control" id="department" readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="province">Provincia</label>
                            <input type="text" class="form-control" id="province" readonly>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="district">Distrito</label>
                            <input type="text" class="form-control" id="district" readonly>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="{{ asset('js/scripts/dni.js')}}"></script>

@endpush
