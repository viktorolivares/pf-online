jQuery(function ($) {
    $("#btn-dni").on("click", function (e) {
        e.preventDefault();
        resetForm();
        $("#alert").hide();

        var dni = $("#dni").val();
        var btn = $(this);
        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        if (dni) {
            $.ajax({
                type: "GET",
                url: "/dni/" + dni,
                beforeSend: function () {
                    $("div.loading").show();
                },
                success: function (data) {
                    console.log(data);

                    if (data.error == 404) {
                        $.notify("No se encontró coincidencias", "info");
                    } else {
                        if (data.oefa.original.esValido != "true") {
                            $.notify(data.oefa.original.mensaje, "error");
                            $("#name").val(
                                data.sunat.original.error
                                    ? ""
                                    : data.sunat.original.nombreSoli
                            );
                            $("#lastname1").val(
                                data.sunat.original.error
                                    ? ""
                                    : data.sunat.original.apePatSoli
                            );
                            $("#lastname2").val(
                                data.sunat.original.error
                                    ? ""
                                    : data.sunat.original.apeMatSoli
                            );
                            $("#code").val(
                                data.sunat.original.error ? "" : data.codigoV
                            );
                        } else {
                            if (data.oefa.original.fechaNacimiento != null) {
                                var birthday =
                                    data.oefa.original.fechaNacimiento;
                                y = birthday.substr(0, 4);
                                m = birthday.substr(4, 2);
                                d = birthday.substr(6, 2);

                                var date = d + "/" + m + "/" + y;
                                var date2 = y + "/" + m + "/" + d;
                            }

                            $("#name").val(data.sunat.original.nombreSoli);
                            $("#lastname1").val(data.sunat.original.apePatSoli);
                            $("#lastname2").val(data.sunat.original.apeMatSoli);
                            $("#code").val(data.codigoV);
                            $("#address").val(data.oefa.original.direccion);
                            $("#ubigeo").val(data.oefa.original.ubigeo);

                            var ubigeo = data.oefa.original.ubigeo;

                            $.ajax({
                                type: "GET",
                                dataType: "json",
                                url: "js/ubigeo.json",
                                success: function (data) {
                                    $.each(data, function (i, v) {
                                        if (v.inei_district == ubigeo) {
                                            $("#department").val(
                                                v.departamento
                                            );
                                            $("#province").val(v.provincia);
                                            $("#district").val(v.distrito);
                                            return false;
                                        }
                                    });
                                },
                            });

                            if (data.oefa.original.genero == 117) {
                                $("#sex").val("Hombre");
                            } else if (data.oefa.original.genero == 118) {
                                $("#sex").val("Mujer");
                            } else {
                                $("#sex").val("-");
                            }

                            if (data.oefa.original.estadoCivil == 112) {
                                $("#status").val("Soltero(a)");
                            } else if (data.oefa.original.estadoCivil == 115) {
                                $("#status").val("Divorciado(a)");
                            } else if (data.oefa.original.estadoCivil == 113) {
                                $("#status").val("Casado(a)");
                            } else {
                                $("#status").val("-");
                            }

                            $("#age").val(calcularAge(date2));

                            if (calcularAge(date2) < 18) {
                                $.notify(
                                    "DNI Corresponde a un menor de edad",
                                    "error"
                                );
                            }

                            $("#date").val(date);
                        }

                        $.notify("Consulta cargada exitosamente", "success");
                    }

                    $("div.loading").hide();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $.notify("Status: Error en servidor externo", "error");
                    $.notify("Error: " + errorThrown, "error");
                },
            });
        } else {
            $.notify("Ingrese un número de DNI", "error", {
                position: "top center",
            });
        }
    });

    $.date = function (dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "/" + month + "/" + year;

        return date;
    };

    $.date2 = function (dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = year + "/" + month + "/" + day;
        return date;
    };

    function calcularAge(date) {
        var today = new Date();
        var birthday = new Date(date);
        var age = today.getFullYear() - birthday.getFullYear();
        var m = today.getMonth() - birthday.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        return age;
    }

    function resetForm() {
        $("#name").val("");
        $("#lastname1").val("");
        $("#lastname2").val("");
        $("#code").val("");
        $("#address").val("");
        $("#date").val("");
        $("#age").val("");
        $("#status").val("");
        $("#sex").val("");
        $("#ubigeo").val("");
        $("#department").val("");
        $("#province").val("");
        $("#district").val("");
    }
});
