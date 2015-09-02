$(document).ready(function () {
    
    $("#schedule").hide(); 
    $("#reg-nav").click(function (event) {
        $("#register").show();
        $("#schedule").hide(); 
        event.preventDefault();
    });
    $("#sch-nav").click(function (event) {
        $("#register").hide();
        $("#schedule").show(); 
        event.preventDefault();
    });
    
    $('#form-register').submit(function(event) {
        var player={};
        player.name=$('#pName').val().trim();
        player.email=$('#pEmail').val().trim();
        console.log('from client: '+JSON.stringify(player))
        sendPlayer(player);
        
        event.preventDefault();
    });
});

function sendPlayer(player){
    var qUrl='/player';
    $.ajax({
        url: qUrl,
        type:'POST',
        contentType: 'application/json', 
        data:JSON.stringify(player),
        success:function(){
            $('#register-player').removeClass("btn-primary");
            $('#register-player').addClass("btn-success");
            $('#register-player').html('Success!');
            $('#register-player').prop('disabled','true');
            $('#result').addClass('alert alert-success');
            $('#result').html('Now bend your back and start twisting those rods. We will let you know once teams are finalised');
        },
        error:function(){
            $('#register-player').removeClass("btn-primary");
            $('#register-player').addClass("btn-error");
            $('#register-player').html('Error!');
            $('#result').addClass('alert alert-danger');
            $('#result').html('Asshole, You broke it. Call Sudeep for a quick fix!');
        }
    });
};