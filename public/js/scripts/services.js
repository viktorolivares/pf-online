jQuery(function ($) {
    $("#btn-dni").on("click", function (e) {
        e.preventDefault();
        resetData();

        var dni = $("#dni").val();
        var btn = $(this);
        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 2000);

        if (dni) {
            $.ajax({
                type: "GET",
                url: "/dni/" + dni,
                success: function (data) {
                    console.log(data);
                    /*Sunat*/
                    if (data.sunat.success == false) {
                        $.notify("Sunat: " + data.sunat.message, "info");
                    } else {
                        if (data.sunat.original.error) {
                            $.notify(
                                "Sunat: " + data.sunat.original.error,
                                "error"
                            );
                        } else {
                            $("#nameS span").append(
                                data.sunat.original.nombreSoli
                            );
                            $("#lastname1S span").append(
                                data.sunat.original.apePatSoli
                            );
                            $("#lastname2S span").append(
                                data.sunat.original.apeMatSoli
                            );
                        }
                    }

                    /*JNE*/
                    if (data.jne.error == 404) {
                        $.notify("JNE: No se encontró coincidencias", "info");
                    } else {
                        if (!data.jne.original.vMensajeResponse) {
                            $("#nameM span").append(data.jne.original.nombres);
                            $("#lastname1M span").append(
                                data.jne.original.apellidoPaterno
                            );
                            $("#lastname2M span").append(
                                data.jne.original.apellidoMaterno
                            );
                        } else {
                            $.notify("JNE: " + data.jne.error, "error");
                        }
                    }

                    /*Oefa*/
                    if (data.oefa.error == 404) {
                        $.notify("Oefa: No se encontró coincidencias", "info");
                    } else {
                        if (data.oefa.original.esValido == "true") {
                            $("#nameO span").append(data.oefa.original.nombres);
                            $("#lastname1O span").append(
                                data.oefa.original.apellidoPaterno
                            );
                            $("#lastname2O span").append(
                                data.oefa.original.apellidoMaterno
                            );
                        } else {
                            $.notify(
                                "Oefa: " + data.oefa.original.mensaje,
                                "error"
                            );
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 0) {
                        $.notify("Not connect: Verify Network.", "error");
                    } else if (jqXHR.status == 404) {
                        $.notify("Requested page not found [404].", "error");
                    } else if (jqXHR.status == 500) {
                        $.notify("Internal Server Error [500].", "error");
                    } else if (textStatus === "parsererror") {
                        $.notify("Requested JSON parse failed.", "error");
                    } else if (textStatus === "timeout") {
                        $.notify("Time out error.", "error");
                    } else if (textStatus === "abort") {
                        $.notify("Ajax request aborted.", "error");
                    } else {
                        $.notify(
                            "Uncaught Error: " + jqXHR.responseText,
                            "error"
                        );
                    }
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

    function resetData() {
        $("#nameS span").empty();
        $("#lastname1S span").empty();
        $("#lastname2S span").empty();
        $("#nameM span").empty();
        $("#lastname1M span").empty();
        $("#lastname2M span").empty();
        $("#nameO span").empty();
        $("#lastname1O span").empty();
        $("#lastname2O span").empty();
        $("#nameE span").empty();
        $("#lastname1E span").empty();
        $("#lastname2E span").empty();
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
