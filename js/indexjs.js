	$(document).on("ready",function(){
		// $("form").on("click",function(e){
		// 	e.preventDefault();
		// });

		$("#Login").on("click",function(e){
			e.preventDefault();
			ErrorLogin.innerHTML="<sup>*</sup>Username and password values are required"
			if(($("#USER").val()=="")||($("#password").val()=="")){
				$("#ErrorLogin").show();
			}
			else
			{
				var x = document.getElementById("remember").checked;
				var dataToSend ="";
				if(x)
				{
				dataToSend = {
				"username": $("#USER").val(),
          		"password": $("#password").val(),
          		"remember": 'true'
				};
				}
				else
				{
				dataToSend = {
				"username": $("#USER").val(),
          		"password": $("#password").val(),
				"remember": 'false'
				};
				}
	
				$("#ErrorLogin").hide();

				$.ajax({
					url: "data/loginService.php",
					type:"POST",
					data: dataToSend,
					dataType: "json",
					contentType: "application/x-www-form-urlencoded",
					success:function(JsonObject){
						alert("welcome " + JsonObject.firstName + " "+ JsonObject.lastName);
						window.location.replace("Home.html");
					},
					error:function(errorMsg){
						alert(errorMsg.statusText);
						location.reload();
					}
				});
			}
		});


		$("#Cancel").on("click",function(){
			location.reload();
		});
		$("#canel").on("click",function(){
			location.reload();
		});

		$("#reg").on("click",function(e){
			e.preventDefault();
			ErrorName.innerHTML="<sup>*</sup>First and Last Name are required";
			var nam = true;
			UserError.innerHTML="<sup>*</sup>Username field is required";
			$("#UserError").hide();
			var Usr = true;
			MailError.innerHTML="<sup>*</sup>Please provide an email address";
			$("#MailError").hide();
			var mail=true;
			passwordError.innerHTML="<sup>*</sup>Please provide a password and its confirmation";
			$("#passwordError").hide();
			var pas=true;
			if(($("#First_name").val()=="")||($("#Last_name").val()=="")){
				$("#ErrorName").show();
				nam=false;
			}
			else{
				$("#ErrorName").hide();
				nam=true;
			}
			if($("#user_reg").val()==""){
				$("#UserError").show();
				Usr=false;
			}
			else{Usr=true;}
			if($("#email_reg").val()==""){
				$("#MailError").show();
				mail=false;
			}
			else{mail=true;}
			if(($("#password_reg").val()=="")||($("#password_reg_conf").val()=="")){
				$("#passwordError").show();
				pas=false;
			}
			else{pas=true;}
			Gender_sel.innerHTML="<sup>*</sup>Please select a Gender"
			$("#Gender_sel").hide();
			var gen=true;
			if(!($("[name=gender]").is(":checked"))){
				$("#Gender_sel").show();
				gen=false;
			}
			else{gen=true}
			radio_o.innerHTML="<sup>*</sup>Please select a Country";
			$("#radio_o").hide();
			var rad=true;
			if($("#sel option[value=1]:selected").length>0){
				$("#radio_o").show();
				rad=false;
			}
			else{rad=true;}
			
			if(nam&&Usr&&mail&&pas&&gen&&rad){
			var dataToSend = {
                "User": $("#user_reg").val(),
                "Pass": $("#password_reg").val(),
                "first": $("#First_name").val(),
                "last": $("#Last_name").val(),
                "mail": $("#email_reg").val(),
                "gend": $("input[name='gender']:checked").val(),
                "country" : $("#sel option:selected").text()
            };
            $.ajax({
                url:"data/registrationService.php",
                type: "POST",
                data: dataToSend,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success:function(jsnObject){
                    alert("success");
                    window.location.replace("home.html");
                },
                error: function(errorMsg){
                    alert(errorMsg);
                    alert("Registration error");
                }
            });
				//window.location.href="Home.html";
			}
		});
	$.ajax({
		type: "POST",
		url: "data/cookieService.php",
		dataType: "json",
		success:function(jsonCookie)
		{
			alert(jsonCookie.cookieValue);
		},
		error: function(errorMsg)
		{
			alert(errorMsg.statusText);
		}
	});

	});