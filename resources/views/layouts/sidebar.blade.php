<ul class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{route('dashboard')}}">
        <div class="sidebar-brand-icon">
            <img src="{{asset('img/logo.png')}}" width="60px">
        </div>
    </a>
    <hr class="sidebar-divider my-0">
    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="{{route('dashboard')}}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
        </a>
    </li>
    <hr class="sidebar-divider">
    <div class="sidebar-heading">
        Interface
    </div>
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse" aria-expanded="true"
            aria-controls="collapse">
            <i class="fas fa-fw fa-search"></i>
            <span>Consultas</span>
        </a>
        <div id="collapse" class="collapse {{ (request()->is('dni','dnimultiple', 'age', 'ruc')) ? 'show' : '' }}"
            aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">RENIEC</h6>
                <a class="collapse-item {{ (request()->is('dni')) ? 'active' : '' }}" href="{{route('dni')}}">
                    Individual
                </a>
                <a class="collapse-item {{ (request()->is('dnimultiple')) ? 'active' : '' }}" href="{{route('dni-multiple')}}">
                    Masivo
                </a>
                <a class="collapse-item {{ (request()->is('age')) ? 'active' : '' }}" href="{{route('age')}}">
                    Validar 18+
                </a>
                <hr class="sidebar-divider">
                <h6 class="collapse-header">SUNAT</h6>
                <a class="collapse-item {{ (request()->is('ruc')) ? 'active' : '' }}" href="{{route('ruc')}}">RUC</a>
            </div>
        </div>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
            aria-controls="collapseTwo">
            <i class="fas fa-fw fa-wrench"></i>
            <span>Utilidades</span>
        </a>
        <div id="collapseTwo" class="collapse {{ (request()->is('services', 'ip')) ? 'show' : '' }}"
            aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item {{ (request()->is('ip')) ? 'active' : '' }}" href="{{route('ip')}}">Verf. IP</a>
                <a class="collapse-item {{ (request()->is('domain')) ? 'active' : '' }}"
                    href="{{route('domain')}}">Domain Valid
                </a>
                <a class="collapse-item {{ (request()->is('services')) ? 'active' : '' }}"
                    href="{{route('services')}}">Services
                </a>
            </div>
        </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Nav Item - Config. -->
    <li class="nav-item">
        <a class="nav-link" href="#">
            <i class="fas fa-fw fa-cog"></i>
            <span>Configuración</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <div class="sidebar-card d-none d-lg-flex">
        <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
        <p class="text-center mb-2">
            Desarrollado por el equipo de Prevención de Fraude On-line
        </p>
    </div>

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
</ul>
