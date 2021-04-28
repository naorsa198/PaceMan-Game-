var flag=false;
var Users=new Array();
var admin = {
    username: "k",
    name: "k",
    password: "k",
    email: "k@k.com",
    date: "18/4/2021"
}
Users.push(admin);
var dialog
$( function() {
    var  form,

        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $( "#name" ),
        email = $( "#email" ),
        password = $( "#password" ),
        date = $( "#date" ),
    username = $("#Username "),
    allFields = $( [] ).add( name ).add( email ).add( password ).add( date).add(username),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function check_date() {
        if ($("#date").val() !=='') {
            return true;
        } else{
            date.addClass("ui-state-error")
            return false;}
    }

    function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );
        flag =check_date()
        valid = valid && checkLength( name, "name", 1, 16 );
        valid = valid && checkLength( email, "email", 6, 80 );
        valid = valid && checkLength( password, "password", 6, 16 );
        valid = valid && checkLength( username, "username", 1, 16 );


        valid = valid && checkRegexp( name, /^[a-z]([a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
        valid = valid && checkRegexp( username, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );

        if ( valid && flag) {
            alert("Registration Successfull");
            $( "#users tbody" ).append( "<tr>" +
                "<td>" + username.val() + "</td>" +
                "<td>" +  email.val()+ "</td>" +
                "<td>" + date.val() + "</td>" +


                "</tr>" );

            var newUser={
                username: $("#Username").val(),
                name: $("#name").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                date: $("#date").val()
            }
            Users.push(newUser);
            showDiv('login');
            dialog.dialog( "close" );

        }
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });
});

function openDialog(){
    showDiv('register');
    dialog.dialog( "open" );

}