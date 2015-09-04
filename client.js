$(document).ready(function () {
    
    $("#tournament").hide(); 
    $("#schedule").hide();
    
    $("#reg-nav").click(function (event) {
        $("#register").show();
        $("#schedule").hide();
        $("#tournament").hide(); 
        event.preventDefault();
    });
    $("#sch-nav").click(function (event) {
        $("#register").hide();
        $("#schedule").show();
        $("#tournament").hide(); 
        event.preventDefault();
    });
    $("#tou-nav").click(function (event) {
        $("#register").hide();
        $("#tournament").show(); 
        $("#schedule").hide();
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
    var qUrl='/newplayer';
    $.ajax({
        url: qUrl,
        type:'POST',
        contentType: 'application/json', 
        data:JSON.stringify(player),
        success:function(data){
            $('#register-player').removeClass("btn-primary");
            $('#register-player').addClass("btn-success");
            $('#register-player').html('Success!');
            $('#register-player').prop('disabled','true');
            $('#result').addClass('alert alert-success');
            $('#result').html('Now bend your back and start twisting those rods. We will let you know once teams are finalised!');
            displayPlayers(data);
        },
        error:function(data){
            var error=data.responseJSON.errors.email.message || 'Asshole, You broke it. Refresh the page and try registering again!';
            $('#register-player').removeClass("btn-primary");
            $('#register-player').addClass("btn-danger");
            $('#register-player').html('Error!');
            $('#register-player').prop('disabled','true');
            $('#result').addClass('alert alert-danger');
            $('#result').html(error);
        }
    });
}

function displayPlayers(players)
{
    var listHTML="";
    var head='<div class="row players">'+players.length+' players have registered so far..<hr>';
    players.forEach(function(element,index,arr){
    listHTML+=", "+element.name;
    });
    listHTML=head+listHTML.substring(2)+'</div>';
    $("#players").html(listHTML);
}