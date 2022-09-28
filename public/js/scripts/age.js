jQuery(function ($) {
    $("#table-dni").hide();
    $("#progress").hide();
    $("#btn-excel").hide();

    $("#btn-dni").on("click", function (e) {
        e.preventDefault();

        $("#table-dni").hide();
        $("#progress").hide();
        $("#btn-excel").hide();
        $("#body").empty();

        $(".progress-bar")
            .css("width", 0 + "%")
            .attr("aria-valuenow", 0)
            .text(0 + "%");

        $("#msg-span").removeClass("success-bg").addClass("primary-bg");

        var dni = $("#dni").val().split(/\n/);

        dni = dni.filter(Boolean);

        var btn = $(this);

        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        var dni_all = document.getElementById("dni").value;

        if (dni_all) {

            if (dni.length <= 200) {

                for (var i = 0, j = 0; i < dni.length; i++) {

                    $("#msg-span").text("Consultando...");

                    $.ajax({
                        type: "GET",
                        url: "/dni/" + dni[i],
                        data: {},

                        beforeSend: function () {
                            $("div.loading").show();
                        },

                        success: function (data) {

                            progressed = Math.floor((++j / dni.length) * 100);

                            $("#progress").show();

                            $(".progress-bar")
                                .css("width", progressed + "%")
                                .attr("aria-valuenow", progressed)
                                .text(progressed + "%");

                            var table = "";

                            console.log(data);

                            if (data.oefa.original.fechaNacimiento) {

                            } else {

                            }

                            if (data.oefa.original.fechaNacimiento != null) {
                                var birthday =
                                    data.oefa.original.fechaNacimiento;
                                y = birthday.substr(0, 4);
                                m = birthday.substr(4, 2);
                                d = birthday.substr(6, 2);

                                var date = d + "/" + m + "/" + y;
                                var date2 = y + "/" + m + "/" + d;
                            }

                            var age = calcularAge(date2);

                            if (age < 18) {
                                (table += '<tr class="table-danger">'),
                                    (table += "<td>" + data.dni + "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.nombreSoli +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.apePatSoli +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.apeMatSoli +
                                        "</td>"),
                                    (table += "<td>" + data.codigoV + "</td>"),
                                    (table += "<td>" + date + "</td>"),
                                    (table +=
                                        "<td>" + calcularAge(date2) + "</td>");
                                if (data.oefa.original.genero == 117) {
                                    table += "<td>" + "H" + "</td>";
                                } else {
                                    table += "<td>" + "M" + "</td>";
                                }
                                (table +=
                                    "<td>" +
                                    data.oefa.original.direccion +
                                    "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.oefa.original.mensaje +
                                        "</td>"),
                                    (table += "</tr>");

                                $("#body").append(table);
                            } else {
                                if (data.oefa.original.mensaje) {
                                    if (data.oefa.original.mensaje.includes( "DNI corresponde a un menor de edad" )) {
                                        table += '<tr class="table-danger">';
                                    } else {
                                        table += "<tr>";
                                    }
                                } else {
                                    table += "<tr>";
                                }
                                (table += "<td>" + data.dni + "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.nombreSoli +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.apePatSoli +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.sunat.original.apeMatSoli +
                                        "</td>"),
                                    (table += "<td>" + data.codigoV + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>");
                                if (data.oefa.original.genero) {
                                    if (data.oefa.original.genero == 117) {
                                        table += "<td>" + "H" + "</td>";
                                    } else {
                                        table += "<td>" + "M" + "</td>";
                                    }
                                } else {
                                    table += "<td>" + "-" + "</td>";
                                }
                                (table +=
                                    "<td>" +
                                    (data.oefa.original.direccion == null
                                        ? "-"
                                        : data.oefa.original.direccion) +
                                    "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.oefa.original.mensaje +
                                        "</td>"),
                                    (table += "</tr>");

                                $("#body").append(table);
                            }

                            if (progressed == 100) {
                                $("div.loading").hide();

                                $("#msg-span")
                                    .text("Proceso Finalizado")
                                    .removeClass("primary-bg")
                                    .addClass("success-bg");

                                $("#btn-excel").show();
                            }
                        },

                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status === 0) {
                                $.notify(
                                    "Not connect: Verify Network.",
                                    "error"
                                );
                            } else if (jqXHR.status == 404) {
                                $.notify(
                                    "Requested page not found [404].",
                                    "error"
                                );
                            } else if (jqXHR.status == 500) {
                                $.notify(
                                    "Internal Server Error [500].",
                                    "error"
                                );
                            } else if (textStatus === "parsererror") {
                                $.notify(
                                    "Requested JSON parse failed.",
                                    "error"
                                );
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

                            location.reload();
                        },
                    }).fail(function (xhr, textStatus, errorThrown) {
                        $.notify(
                            "Uncaught Error: " + xhr.responseText,
                            "error"
                        );
                    });
                }
            } else {
                $.notify("Número máximo de consultas: 200", "error");
                $("#msg-span").text("Número máximo de consultas: 200");
            }
        } else {
            $.notify("Ingrese un número de DNI", "error");
            $("#msg-span").text("Ingrese un número de DNI");
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

    var excel_name = new Date().getTime();

    $("#btn-excel").click(function (e) {
        $("#table-dni").table2excel({
            filename: "dni-" + excel_name + ".xls",
            preserveColors: true,
        });
    });
});
