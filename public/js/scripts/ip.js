jQuery(function ($) {
    $("#table-ip").hide();
    $("#progress").hide();
    $("#btn-excel").hide();

    $("#btn-ip").on("click", function (e) {
        e.preventDefault();

        $("#table-ip").hide();
        $("#progress").hide();
        $("#btn-excel").hide();

        $(".progress-bar")
            .css("width", 0 + "%")
            .attr("aria-valuenow", 0)
            .text(0 + "%");

        $("#msg-span").removeClass("success-bg").addClass("primary-bg");

        const ip = $("#ip").val().split(/\n/);
        const body = $("#body").empty();
        const btn = $(this);

        btn.prop("disabled", true);

        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        const ip_all = document.getElementById("ip").value;

        if (ip_all) {
            if (ip.length <= 50) {
                for (var i = 0, j = 0; i < ip.length; i++) {
                    $("#msg-span").text("Consultando...");

                    $.ajax({
                        type: "GET",
                        url: "/ip-consult/" + ip[i],
                        beforeSend: function () {
                            $("div.loading").show();
                        },
                        success: function (data) {
                            progressed = Math.floor((++j / ip.length) * 100);

                            console.log(data);

                            $("#progress").show();

                            $(".progress-bar")
                                .css("width", progressed + "%")
                                .attr("aria-valuenow", progressed)
                                .text(progressed + "%");

                            var table = "";

                            if (
                                data.data.original.error == true ||
                                data.data1.original.error
                            ) {
                                (table += "<tr>"),
                                    (table += "<td>" + data.ip + "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.reason +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data1.original.error
                                            .error_message +
                                        "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "</tr>");
                                table += "</tr>";

                                $("#body").append(table);
                            } else {
                                (table += "<tr>"),
                                    (table += "<td>" + data.ip + "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.country_name +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.region +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.city +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.latitude +
                                        " | " +
                                        data.data.original.longitude +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data1.original.latitude +
                                        " | " +
                                        data.data1.original.longitude +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.network +
                                        "</td>"),
                                    (table +=
                                        "<td>" +
                                        data.data.original.org +
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

                                $("#table-ip").show();
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
                        },
                    }).fail(function (xhr, textStatus, errorThrown) {
                        alert(xhr.responseText);
                    });
                }
            } else {
                $.notify("Máximo 50 consultas", "error");
            }
        } else {
            $.notify("Ingrese un Registro", "error");
        }
    });

    $("#btn-excel").click(function (e) {
        $("#table-ip").table2excel({
            filename: "ip-" + excel_name + ".xls",
            preserveColors: false,
        });
    });

    var excel_name = new Date().getTime();
});
