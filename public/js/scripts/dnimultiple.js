jQuery(function ($) {

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

        console.log($("#dni").val());
        var dni = $("#dni").val().split(/\n/);

        dni = dni.filter(Boolean);
        var btn = $(this);
        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        var dni_all = document.getElementById("dni").value;

        if (dni_all) {
            if (dni.length <= 1000) {
                for (var i = 0, j = 0; i < dni.length; i++) {

                    $.ajax({
                        type: "GET",
                        url: "/dnimultiple/" + dni[i],
                        data: {},

                        beforeSend: function () {
                            $("div.loading").show();
                        },

                        success: function (data) {

                            console.log(data);
                            progressed = Math.floor((++j / dni.length) * 100);
                            $("#progress").show();
                            $(".progress-bar")
                                .css("width", progressed + "%")
                                .attr("aria-valuenow", progressed)
                                .text(progressed + "%");

                            var table = "";

                            if (data.sunat.success == false) {
                                (table += "<tr>"),
                                    (table += "<td>" + data.dni + "</td>"),
                                    (table += "<td>" + data.sunat.message + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "</tr>");

                                $("#body").append(table);

                            } else {
                                (table += "<tr>"),
                                    (table += "<td>" + data.dni + "</td>"),
                                    (table += "<td>" + (data.sunat.original.error ? data.sunat.original.error : data.sunat.original.nombreSoli) + "</td>"),
                                    (table += "<td>" + (data.sunat.original.error ? "-" : data.sunat.original.apePatSoli) + "</td>"),
                                    (table += "<td>" + (data.sunat.original.error ? "-" : data.sunat.original.apeMatSoli) + "</td>"),
                                    (table += "<td>" + (data.sunat.original.error ? "-" : data.codigoV) + "</td>"),
                                    (table += "</tr>");

                                $("#body").append(table);
                            }

                            if (progressed == 100) {
                                $("div.loading").hide();
                                $("#btn-excel").show();
                            }
                        },

                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status === 0) {
                                $.notify("Not connect: Verify Network.", "error");
                            } else if (jqXHR.status == 404) {
                                $.notify("Requested page not found [404].", "error");
                            } else if (jqXHR.status == 500) {
                                $.notify("Internal Server Error [500].","error");
                            } else if (textStatus === "parsererror") {
                                $.notify("Requested JSON parse failed.","error");
                            } else if (textStatus === "timeout") {
                                $.notify("Time out error.", "error");
                            } else if (textStatus === "abort") {
                                $.notify("Ajax request aborted.", "error");
                            } else {
                                $.notify("Uncaught Error: " + jqXHR.responseText,"error");
                            }

                            location.reload();
                        },
                    }).fail(function (xhr, textStatus, errorThrown) {
                        $.notify( "Uncaught Error: " + xhr.responseText,"error");
                    });
                }
            } else {
                $.notify("Número máximo de consultas: 1,000", "error");
            }
        } else {
            $.notify("Ingrese un número de DNI", "error");
        }
    });

    $("#btn-excel").click(function (e) {
        $("#table-dni").table2excel({
            filename: "dni-" + excel_name + ".xls",
            preserveColors: false,
        });
    });

    var excel_name = new Date().getTime();
});
