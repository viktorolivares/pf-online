jQuery(function ($) {

    $("#btn-domain").on("click", function (e) {
        e.preventDefault();

        $("#progress").hide();
        $("#table-domain").hide();
        $("#btn-excel").hide();

        $(".progress-bar")
            .css("width", 0 + "%")
            .attr("aria-valuenow", 0)
            .text(0 + "%");

            $("#body").empty();

        var domain = $("#domain").val().split(/\n/);
        domain = domain.filter(Boolean);

        var btn = $(this);
        btn.prop("disabled", true);
        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        var domain_all = document.getElementById("domain").value;

        if (domain_all) {
            if (domain.length <= 10) {
                for (var i = 0, j = 0 ; i < domain.length; i++) {
                    $.ajax({
                        type: "GET",
                        url: "/domain-consult/" + domain[i],
                        beforeSend: function () {
                            $("div.loading").show();
                        },
                        success: function (data) {
                            progressed = Math.floor((++j / domain.length) * 100);

                            console.log(data);

                            $("#progress").show();
                            $(".progress-bar")
                                .css("width", progressed + "%")
                                .attr("aria-valuenow", progressed)
                                .text(progressed + "%");

                            var table = "";

                            var malware = data.data.original.malware;
                            var phishing = data.data.original.phishing;
                            var unsafe = data.data.original.unsafe;

                            var parking = data.data.original.parking;
                            var spamming = data.data.original.spamming;
                            var suspicious = data.data.original.suspicious;

                            var score = data.data.original.risk_score;
                            var domainAge = data.data.original.domain_age.human;



                            if ( data.data.original.success && data.data.original.success === true ) {
                                (table += "<tr>"),
                                    (table += "<td>" + data.data.original.domain + ' → '+ data.domain + "</td>"),
                                    (table += "<td>" + data.data.original.category  + "</td>"),
                                    (table += "<td>" +
                                        (malware == true ? ' <span class="badge badge-danger">Malware</span> ': '')  + (phishing == true ? ' <span class="badge badge-danger">Phishing</span> ': '') +
                                        (unsafe == true ? ' <span class="badge badge-danger">Unsafe</span> ': '') + (parking == true ? ' <span class="badge badge-danger">Temp-Email</span> ': '') +
                                        (spamming == true ? ' <span class="badge badge-warning">Malware</span> ': '') + (suspicious == true ? ' <span class="badge badge-warning">Suspicious</span> ': '') +
                                        (score >= 0 && score < 25 ? ' <span class="badge badge-primary">Very Low</span>  ': '') + (score >= 25 && score < 50 ? ' <span class="badge badge-success">Low</span> ': '') +
                                        (score >= 50 && score < 75 ? ' <span class="badge badge-info">Medium</span> ': '') + (score >= 75 && score < 85 ? ' <span class="badge badge-dark">High</span> ': '') +
                                        (score >= 85 &&  score <= 100  ? ' <span class="badge badge-danger">Very High</span> ': '') +
                                    "</td>"),
                                    (table += "<td>" + score + "</td>"),
                                    (table += "<td>" + domainAge + "</td>"),
                                    (table += "</tr>");
                                table += "</tr>";

                                $("#body").append(table);

                            } else {
                                $.notify("Excede el número de consultas permitidas",  "error");
                            }

                            if (progressed == 100) {
                                $("div.loading").hide();
                                $("#btn-excel").show();
                                $("#table-domain").show();
                                $("#progress").hide();
                                $("#table-domain").paging({
                                    limit: 5,
                                    rowDisplayStyle: "block",
                                    activePage: 0,
                                    rows: [],
                                });
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status === 0) {
                                $.notify("Not connect: Verify Network.",  "error");
                            } else if (jqXHR.status == 404) {
                                $.notify("Requested page not found [404].","error");
                            } else if (jqXHR.status == 500) {
                                $.notify("Internal Server Error [500].", "error");
                            } else if (textStatus === "parsererror") {
                                $.notify("Requested JSON parse failed.","error");
                            } else if (textStatus === "timeout") {
                                $.notify("Time out error.", "error");
                            } else if (textStatus === "abort") {
                                $.notify("Ajax request aborted.", "error");
                            } else {
                                $.notify( "Uncaught Error: " + jqXHR.responseText,"error");
                            }

                            location.reload();
                        },
                    }).fail(function (xhr, textStatus, errorThrown) {
                        $.notify("Uncaught Error: " + xhr.responseText,"error");
                    });
                }
            } else {
                $.notify("Máximo 10 consultas", "error");
            }
        } else {
            $.notify("Ingrese un Registro", "error");
        }
    });


    $("#btn-excel").click(function (e) {
        $("#table-domain").table2excel({
            filename: "domain-" + excel_name + ".xls",
            preserveColors: true,
        });
    });

    var excel_name = new Date().getTime();

});
