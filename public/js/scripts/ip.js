jQuery(function ($) {

    $("#btn-ip").on("click", function (e) {
        e.preventDefault();

        $("#progress").hide();
        $("#btn-excel").hide();
        $("#table-ip").hide();
        $("#view-maps").hide();

        $(".progress-bar")
            .css("width", 0 + "%")
            .attr("aria-valuenow", 0)
            .text(0 + "%");

        $("#body").empty();

        var ip = $("#ip").val().split(/\n/);
        ip = ip.filter(Boolean);

        var btn = $(this);
        btn.prop("disabled", true);
        setTimeout(function () {
            btn.prop("disabled", false);
        }, 5000);

        var ip_all = document.getElementById("ip").value;

        if (ip_all) {
            if (ip.length <= 100) {
                for (var i = 0, j = 0, k = 1, l = 1; i < ip.length; i++) {
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

                            if ( data.data.original.error == true ) {
                                (table += "<tr>"),
                                    (table += "<td>" + data.ip + "</td>"),
                                    (table += "<td>" + data.data.original.reason + "</td>"),
                                    (table += "<td>" + '-' + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "<td>" + "-" + "</td>"),
                                    (table += "</tr>");
                                table += "</tr>";

                                $("#body").append(table);

                            } else {
                                country = data.data.original.country;
                                function getData(response) {
                                    $.getJSON(  "js/flag.json", function (data, status) {
                                        $.each( data,function (index, value) {
                                            if (value.code == response ) {
                                                $("#c" + l++).html( '<img src="' + value.image + '" width="25"/>' );
                                            }
                                        });
                                    });
                                }

                                (table += "<tr>"),
                                    (table += "<td>" + data.ip + "</td>"),
                                    (table += "<td>" + data.data.original.country_name + "</td>"),
                                    (table += '<td id="c' + k++ + '">' + "</td>"),
                                    (table += "<td>" + data.data.original.region + "</td>"),
                                    (table += "<td>" + data.data.original.city + "</td>"),
                                    (table += "<td>" + '<a type="button" class="btn btn-link btn-sm view-map" data-lat="' +
                                        data.data.original.latitude +'" data-long="' +
                                        data.data.original.longitude +
                                        '" data-city="' +
                                        data.data.original.city +
                                        '">' +
                                        "MAPA" +
                                        "</a>" +
                                        "</td>"),
                                    (table += "<td>" + data.data.original.network +"</td>"),
                                    (table += "<td>" + data.data.original.org + "</td>"),
                                    (table += "</tr>");

                                getData(country);

                                $("#body").append(table);
                            }

                            if (progressed == 100) {
                                $("div.loading").hide();
                                $("#btn-excel").show();
                                $("#table-ip").show();
                                $("#table-ip").paging({
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
                $.notify("Máximo 100 consultas", "error");
            }
        } else {
            $.notify("Ingrese un Registro", "error");
        }
    });

    $("#btn-excel").click(function (e) {
        $("#table-ip").table2excel({
            filename: "ip-" + excel_name + ".xls",
            preserveColors: true,
        });
    });

    var excel_name = new Date().getTime();

    $(document).on("click", ".view-map", function (e) {
        e.preventDefault();

        var lat = $(this).data("lat");
        var long = $(this).data("long");
        var city = $(this).data("city");

        console.log(lat, long, city);

        viewMap(lat, long, city);
    });

    function viewMap(latitude, longitude, city) {
        $("#view-maps").html("<div id='map'></div>");

        var map = L.map("map").setView([latitude, longitude], 14);

        setTimeout(function () {
            map.invalidateSize();
        }, 100);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            minZoom: 2,
            attribution: "© OpenStreetMap",
        }).addTo(map);

        var marker = L.marker([latitude, longitude]);

        marker
            .addTo(map)
            .bindPopup(city + "<br>" + latitude + ", " + longitude)
            .openPopup();

        $("#view-maps").show();
    }

});
