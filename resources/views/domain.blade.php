@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-primary">Máximo 10 Consultas</div>
                <small class="card-subtitle text-muted pb-4">[Consultas máximas por mes 5000]</small>
                <form method="GET" id="form-ip">
                    <div class="form-group">
                        <textarea class="form-control" id="domain" rows="10"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" id="btn-domain">Apply</button>
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
                            <div class="alert alert-info alert-dismissible fade show" role="alert">
                                <small>
                                    <strong><i class="fa fa-info-circle"></i> Prueba de reputación de dominio: </strong>
                                    Incluyen phishing, malware, SPAM, Temp-Email | API: ipqualityscore.com
                                </small>
                                <button class="btn btn-success btn-sm float-end" id="btn-excel" style="display: none">
                                    <i class="fa fa-file-excel"></i> &nbsp;
                                    Exportar Excel
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-condensed" id="table-domain" style="display: none">
                                <thead>
                                    <tr>
                                        <th>Domain</th>
                                        <th>Category</th>
                                        <th>Flag</th>
                                        <th>Risk Score</th>
                                        <th>Domain Age</th>
                                    </tr>
                                </thead>
                                <tbody id="body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-2">
                <div class="card">
                    <div class="card-body">
                        <div class="my-1">
                            <div class="alert alert-secondary alert-dismissible fade show" role="alert">
                                <small>
                                    <strong><i class="fa fa-info-circle"></i> Info: </strong>
                                    <ul class="list-unstyled">
                                        <li><b>Unsafe:</b>	Sospecha de dominio no es seguro debido a suplantación de identidad, malware, spam o comportamiento abusivo.</li>
                                        <li><b>Suspicious:</b>	Sospecha de URL maliciosa o se usa para phishing.</li>
                                        <li><b>Phishing:</b> URL asociada con un comportamiento de phishing malicioso</li>
                                        <li><b>Malware:</b> URL está asociada con malware o virus.</li>
                                        <li><b>Parking | Temp-Email:</b> URL actualmente estacionado con un aviso de venta</li>
                                        <li><b>Spamming:</b> Dominio de URL asociado con correo electrónico SPAM o direcciones de correo electrónico abusivas</li>
                                    </ul>
                                </small>
                                <button class="btn btn-success btn-sm float-end" id="btn-excel" style="display: none">
                                    <i class="fa fa-file-excel"></i> &nbsp;
                                    Exportar Excel
                                </button>
                            </div>
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
<script src="{{ asset('js/scripts/domain.js')}}"></script>

@endpush

