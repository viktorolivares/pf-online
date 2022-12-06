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
    <div class="col-md-9" id="card-form" style="font-size: 14px">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-info">
                        <h5 class="card-title text-white">Fuente: Sunat</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="nameS">Nombres: <span></span></li>
                        <li class="list-group-item" id="lastname1S">Ap. Paterno: <span></span></li>
                        <li class="list-group-item" id="lastname2S">Ap. Materno: <span></span></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h5 class="card-title text-white">Fuente: JNE</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="nameM">Nombres: <span></span></li>
                        <li class="list-group-item" id="lastname1M">Ap. Paterno: <span></span></li>
                        <li class="list-group-item" id="lastname2M">Ap. Materno: <span></span></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-success">
                        <h5 class="card-title text-white">Fuente: Oefa</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="nameO">Nombres: <span></span></li>
                        <li class="list-group-item" id="lastname1O">Ap. Paterno: <span></span></li>
                        <li class="list-group-item" id="lastname2O">Ap. Materno: <span></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')

<script src="{{ asset('js/scripts/services.js')}}"></script>

@endpush
