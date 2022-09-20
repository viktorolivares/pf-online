jQuery(function ($) {
    queryJson();

    var events = $("#events");
    var table = $("#table");

    events.hide();
    table.hide();

    function queryJson() {
        $.ajax({
            url: "{{ route('queryodds') }}",
            type: "GET",
            dataType: "JSON",
            success: function (response) {
                table.show();

                console.log(response);

                for (i = 0; i < response.data.sports.length; i++) {
                    $("#body").append(
                        "<tr>" +
                            "<td>" +
                            response.data.sports[i].id +
                            "</td>" +
                            "<td>" +
                            response.data.sports[i].name +
                            "</td>" +
                            "</tr>"
                    );
                }
            },
        });
    }

    $("#btn-event").on("click", function (e) {
        e.preventDefault();
        var id = $("#event").val();
        $.ajax({
            url: "{{ route('queryodds') }}",
            type: "GET",
            dataType: "JSON",
            success: function (response) {
                var event = response.data.events[id];
                console.log(event);
            },
        });
    });
});
