
// Runs when document is fully loaded
$(document).ready(function () {

    // When focusing out of username input text-area
    $('#username').blur(function () {

        // Store user's username to a variable
        let $username = $('#username').val();

        // Create Ajax-object everytime username is given
        $.ajax({

            type: 'GET',
            // Validates the username
            url: 'backend/dbquery.php',
            // Add parameter q="username" to a PHP-file which'll be checked.
            data: 'q=' + $username,
            // If MySQL-query successfully returns the answer
            success: function(data) {
                // Print the message to #dbdata
                $('#dbdata').html(data);
                // If data contains a message which'll allow user's name
                if (data === 'Käytettävissä') {
                    $('input[type=submit]').removeAttr('disabled');
                // With every other msg
                } else {
                    $('input[type=submit]').prop('disabled', true)
                }
            }
        });
    });
});
