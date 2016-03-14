$(document).on("ready",function(){
    $("#HomeTab").attr('class','selected');
    $("#commen").attr('class','displayInfo');
    $("#HomeTab").on("click",function(){
        //removing color to the previous tab and adding to the new
        $("#menu").children().removeAttr('class','selected');
        $(this).attr('class','selected');
        //removing info displayed
        $("#hero").children().hide().removeAttr('class','displayInfo');
        $("#commen").attr('class','displayInfo').show();
        //displaying new info
        $("#hero").css("background-color","white");
    });
    //Loading Comments form friends
    $.ajax({
        url: "data/Comments.php",
        type: "GET",
        dataType:"json",
        success: function(jsonComments){
            var creatingDiv="";
            for(var i=0;i<jsonComments.length;i++)
            {
            creatingDiv += '<div class="container">' + '<p class="comment_added">'+ '<label id="user">'+ jsonComments[i].user_name+": " +'</label>';
            creatingDiv += '<label id="text">'+jsonComments[i].comment +'</label>';
            creatingDiv+='</p>'+'</div>';
            }
            $("#commsection").append(creatingDiv);
        },
        error:function(errorMsg){
        alert(errorMsg.statusText);
        }
        });
        var load = 1;
        $("#MyProfileTab").on("click",function(){
        if(load){
        $.ajax({
            url: "data/profile.php",
                type: "GET",
                dataType:"json",
                success: function(jsonProfile){
                var ProfileInfo="";

                //ProfileInfo+='<div id="prof">';
                //ProfileInfo+='<div id="imgdiv"></br></br> <img id="imagprof" src="IMG/Example.png" class="image"> </br></br></br></div>'
                ProfileInfo+='<div >';
                ProfileInfo+='<label class="usr">Username: </label>'+jsonProfile.user_name +'</br>';
                ProfileInfo+='<label class="names">'+jsonProfile.firstname + ' ' +jsonProfile.lastname+'</br></br>';
                ProfileInfo+='<label class="usr"> Mail: </label>'+jsonProfile.email+'</br>';
                ProfileInfo+='<label class="usr">Country: </label>'
                +jsonProfile.country+'</br>';
                ProfileInfo+='<label class="usr">Gender: </label>'+jsonProfile.gender;
                ProfileInfo+='</div>';
                ProfileInfo+='</div>';
                $("#ProfileDisplay").append(ProfileInfo);
                //$("#ProfileDisplay").hide();
                load=0;
                },
                error:function(errorMsg){
                alert(errorMsg.statusText);
                }
            });
        }
        //removing color to the tab
        $("#menu").children().removeAttr('class','selected');
        $(this).attr('class','selected');
        $("#hero").children().hide().removeAttr('class','displayInfo');
        $("#ProfileDisplay").show().attr('class','displayInfo');
        $("#hero").css("background-color","#CCC");
        });

        $("#send_comment").on("click",function(){
            var comment = $("#comment_box").val();
            var Element="";
            //Element+= '<div class="container">' + '<p class="comment_added">' +'<label id="user">' +' Lab2: '+ '</label>'+ '<label id="text">'+$("#comment_box").val()+"</label>" +'</p>' +'</div';
            if (comment != "")
            {
                //$("#commsection").prepend(Element);
                var dataToSend = {
                    "NewComment": $("#comment_box").val()
                };
                $.ajax({
                    url:"data/NewComment.php",
                    type: "POST",
                    data: dataToSend,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    success: function(JsonComment){
                        location.reload();
                    },
                    error: function(errorMsg){
                        alert(errorMsg.statusText);
                    }

                });
            }
            else
                location.reload();
        });
//Session Service
    $.ajax({
        url:"data/sessionService.php",
        type: "POST",
        dataType: "json",
        success:function(jsonObject){
        //alert(jsonObject.firstName + " " +jsonObject.lastName);
          },
        error: function(errorMsg){
         alert(errorMsg.statusText);
         window.location.replace("Lab1.html");
        }
    });

    $("#logout").on("click", function(){
        $.ajax
        ({
            url:"data/deleteSession.php",
            type:"POST",
            dataType:"json",
            success:function(jsonObject){
            alert("session deleted successfully");
            window.location.replace('Lab1.html');
            },
            error: function(errorMsg)
            {
                //alert(errorMsg.statusText);
                alert("unable to delete cookie");
                window.location.replace('Lab1.html');
            }
        });
    });
});
        //loading data from the data base/xml file and loading it on to the web page to be displayed
        /*$.ajax({
            url:"data/comments.xml",
            dataType: "xml",
            success: function(data){
                 var creatingDiv="";
                 $(data).find("comment").each(function(){
                    var $actualElement = $(this);
                    creatingDiv += '<div class="container">' + '<p class="comment_added">'+ '<label id="user">'+ $actualElement.find("name").attr("username")+": " +'</label>';
                    creatingDiv += '<label id="text">'+$actualElement.find("text").html() +'</label>';
                    creatingDiv+='</p>'+'</div>';
                });
                 $("#commsection").append(creatingDiv);
            },
            error: function(errorMsg){
                console.log(errorMsg);
            }
            });
        //adding comment to the comment section
        $("#send_comment").on("click",function(){
            var comment = $("#comment_box").val();
            var Element="";
            Element+= '<div class="container">' + '<p class="comment_added">' +'<label id="user">' +' Lab2: '+ '</label>'+ '<label id="text">'+$("#comment_box").val()+"</label>" +'</p>' +'</div';
            if (comment != "")
                $("#commsection").prepend(Element);
            else
                location.reload();
        });

        //Slect Home tab and display comments
        $("#HomeTab").on("click",function(){
            //removing color to the previous tab and adding to the new
            $("#menu").children().removeAttr('class','selected');
            $(this).attr('class','selected');
            //removing info displayed
            $("#hero").children().hide().removeAttr('class','displayInfo');
            $("#commen").attr('class','displayInfo').show();
            //displaying new info
            $("#hero").css("background-color","white");
        });

//select my profile tab and load profile
        $("#MyProfileTab").on("click",function(){
            //removing color to the tab
            $("#menu").children().removeAttr('class','selected');
            $(this).attr('class','selected');

            $("#hero").children().hide().removeAttr('class','displayInfo');

            $("#ProfileDisplay").show().attr('class','displayInfo');
            $("#hero").css("background-color","#CCC");
        });
//Loading Profile data
        $.ajax({
            url:"data/profileData.json",
            dataType:"json",
            success:function(jsonProfile){
                var Info="";
                Info+='<div id="prof">';
                Info+='<div id="imgdiv"></br></br> <img id="imagprof" src="IMG/Example.png" class="image"> </br></br></br></div>'
                Info+='<div id="infor">'
                Info+='<label class="usr">Username: </label>'+jsonProfile.username+'</br>';
                Info+='<label class="names">'+jsonProfile.name.firstName + ' ' +jsonProfile.name.lastName+'</br></br>';
                Info+='<label class="usr"> Mail: </label>'+jsonProfile.email+'</br>';
                Info+='<label class="usr">Country: </label>'
                +jsonProfile.country+'</br>';
                Info+='<label class="usr">Gender: </label>'+jsonProfile.gender;
                Info+='</div>';
                Info+='</div>';
                $("#ProfileDisplay").append(Info).hide();
            }
            ,
            error: function(errorMsg){
            console.log(errorMsg);
            }
        });*/



