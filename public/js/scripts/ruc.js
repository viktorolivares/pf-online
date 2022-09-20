jQuery(function ($) {
    $("#btn-ruc").on("click", function (e) {
        e.preventDefault();
        resetForm();
        $("#alert").hide();

        var ruc = $("#ruc").val();
        var btn = $(this);
        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        if (ruc) {
            $.ajax({
                type: "GET",
                url: "/ruc/" + ruc,
                success: function (data) {
                    console.log(data.ruc);

                    if (data.ruc.original) {
                        $("#razon-social").val(data.ruc.original.razonSocial);
                        $("#nombre-comercial").val(
                            data.ruc.original.nombreComercial
                        );
                        $("#act-economica").val(
                            data.ruc.original.actEconomicas[0]
                        );
                        if (data.ruc.original.departamento != null) {
                            $("#ubigeo").val(
                                data.ruc.original.departamento +
                                    "/" +
                                    data.ruc.original.provincia +
                                    "/" +
                                    data.ruc.original.distrito
                            );
                        } else {
                            $("#ubigeo").val("-");
                        }
                        $("#direccion").val(data.ruc.original.direccion);
                        $("#estado").val(data.ruc.original.estado);
                        $("#condicion").val(data.ruc.original.condicion);
                        $("#tipo").val(data.ruc.original.tipo);

                        $.notify("Registro encontrado", "success");
                    } else {
                        $.notify("Ocurrió un problema", "error");
                    }
                },
            });
        } else {
            $.notify("Ingrese un número de ruc", "error", {
                position: "top center",
            });
        }
    });

    function resetForm() {
        $("#razon-social").val("");
        $("#nombre-comercial").val("");
        $("#act-economica").val("");
        $("#ubigeo").val("");
        $("#direccion").val("");
        $("#estado").val("");
        $("#condicion").val("");
        $("#tipo").val("");
    }
});
