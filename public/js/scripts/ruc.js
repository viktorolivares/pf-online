jQuery(function ($) {
    $("#card-form").hide();

    $("#btn-ruc").on("click", function (e) {
        e.preventDefault();

        resetForm();

        $("#alert").hide();
        $("#card-form").hide();

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
                beforeSend: function () {
                    $("div.loading").show();
                },
                success: function (data) {
                    console.log(data);

                    if (data.ruc.original) {
                        $("#nombre-comercial").val(data.ruc.original.nombre);
                        if (data.ruc.original.departamento != null) {
                            $("#ubigeo").val(
                                data.ruc.original.departamento +
                                    " / " +
                                    data.ruc.original.provincia +
                                    " / " +
                                    data.ruc.original.distrito
                            );
                        } else {
                            $("#ubigeo").val("-");
                        }
                        $("#direccion").val(data.ruc.original.direccion);
                        if (data.ruc.original.estado == "ACTIVO") {
                            $(".estado")
                                .text(data.ruc.original.estado)
                                .removeClass("bg-secondary")
                                .addClass("success-bg");
                        } else if(data.ruc.original.estado == "BAJA DE OFICIO"){
                            $(".estado")
                                .text(data.ruc.original.estado)
                                .removeClass("bg-secondary")
                                .addClass("error-bg");
                        }
                        if (data.ruc.original.condicion == "HABIDO") {
                            $(".condicion")
                                .text(data.ruc.original.condicion)
                                .removeClass("bg-secondary")
                                .addClass("success-bg");
                        } else if(data.ruc.original.condicion == "NO HABIDO") {
                            $(".condicion")
                                .text(data.ruc.original.condicion)
                                .removeClass("bg-secondary")
                                .addClass("error-bg");
                        }

                        $.notify("Registro encontrado", "success");
                    } else {
                        $.notify("Ocurrió un problema", "error");
                    }

                    $("div.loading").hide();
                    $("#card-form").show();
                },
            });
        } else {
            $.notify("Ingrese un número de ruc", "error", {
                position: "top center",
            });
        }
    });

    function resetForm() {
        $("#form-result").trigger("reset");

        $(".estado").text("-").removeClass().addClass("bg-secondary estado");

        $(".condicion").text("-").removeClass().addClass("bg-secondary condicion");
    }
});
