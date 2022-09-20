@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body mt-3">
                    <table class="table table-bordered table-hover table-sm" id="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody id="body">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <form>
                <div class="form-group">
                    <input type="number" id="event" class="form-control" placeholder="Ingresa Número de evento">
                </div>
                <button class="btn btn-primary" id="btn-event">Apply</button>
            </form>
            <div class="card" id="events">
                <div class="card-body">
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')

<script src="{{ asset('js/scripts/odds.js')}}"></script>

@endpush

