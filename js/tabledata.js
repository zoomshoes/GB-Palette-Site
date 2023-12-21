$(function() {
    $.getJSON('data/data.json', function(data) {
        $.each(data.stats, function(i, f) {
        var tableRow = "<tr>" + 
            "<td>" + f.Name + "</td>" +
            "<td>" + f.PTS + "</td>" +
            "<td>" + f.REB + "</td>" +
            "<td>" + f.AST + "</td>" +
            "<td>" + f.FGM + "</td>" +
            "<td>" + f.FGA + "</td>" +
            "<td>" + (f.FGP*100).toFixed(1) + "</td>" +
            "<td>" + f.TS + "</td>" +
            "</tr>";
        $(tableRow).appendTo("#statdata tbody");
        });
    });
});

// $(function() {
//     $.getJSON('data/export.json', function(data) {
//         $.each(data.players, function(i, f) {
//         var tableRow = "<tr>" + 
//             "<td>" + f.ast + "</td>" +
//             "<td>" + f.astp + "</td>" +
//             "<td>" + f.drb + "</td>" +
//             "<td>" + f.dws + "</td>" +
//             "<td>" + f.fg + "</td>" +
//             "<td>" + f.fga + "</td>" +
//             // "<td>" + (f.FGP*100).toFixed(1) + "</td>" +
//             "<td>" + 'a' + "</td>" +
//             "</tr>";
//         $(tableRow).appendTo("#statdata tbody");
//         });
//     });
// });