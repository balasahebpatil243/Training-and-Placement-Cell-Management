function validateEmail(paramEmailID) {
        var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;
        
        if (filter.test(paramEmailID)) {
          return true;
        } else {
          return false;
        }
      }

   
   $( document ).ready(function() {

          $("#btn_submit").click(function() {

            if($("#txtName").val() == "") {
               alert("Please Enter Your Name");
               $("#txtName").focus();
               return false;
            }

            if($("#txtUSN").val() == "") {
               alert("Please Enter USN Number");
               $("#txtUSN").focus();
               return false;
            }

            if($("#txtEmail").val() == "") {
               alert("Please Enter Your Email ID");
               $("#txtEmail").focus();
               return false;
            }

            if(!validateEmail($("#txtEmail").val())) {
               alert("Please Enter Valid Email ID");
               $("#txtEmail").focus();
               return false;
            }

            if($("#txtMobile").val().length < 1) {
               alert("Please Enter Mobile Number");
               $("#txtMobile").focus();
               return false;
            }

            if($("#txtMobile").val().length < 10) {
               alert("Please Enter Correct Mobile Number");
               $("#txtMobile").focus();
               return false;
            }

            let arr = ['9','8','7','6'];
            let numberExist = arr.indexOf($("#txtMobile").val().substring(0,1))
            // alert(numberExist);

            if(numberExist == -1) {
               alert("Please Enter Valid Mobile Number");
               return false;
            }

            if($("#txtTotalAvg").val() == "") {
               alert("Please Enter Total Average");
               $("#txtTotalAvg").focus();
               return false;
            }

            if($("#txtBranch").val() == "") {
               alert("Please Enter Branch");
               $("#txtBranch").focus();
               return false;
            }

            if($("#txtSemister").val() == "") {
               alert("Please Enter Semister");
               $("#txtSemister").focus();
               return false;
            }

            if($("#txtFile").val() == "") {
               alert("Please Upload Resume");
               $("#txtFile").focus();
               return false;
            }

            if($("#txtPassword").val() == "") {
               alert("Please Enter Password");
               $("#txtPassword").focus();
               return false;
            }

            $("#btn_submit").prop("disabled", true);
            $("#btn_submit").text('Registering ...');
             sendMessage();
       
          });

          function sendMessage() {
            // alert("alert");
            var formData = new FormData();
            var lclFile = document.getElementById("txtFile");
            lclFile1 = lclFile.files[0];
            formData.append("txtFile", lclFile1);
            formData.append("txtName", $("#txtName").val());
            formData.append("txtUSN", $("#txtUSN").val());
            formData.append("txtEmail", $("#txtEmail").val());
            formData.append("txtMobile", $("#txtMobile").val());
            formData.append("txtTotalAvg", $("#txtTotalAvg").val());
            formData.append("txtBranch", $("#txtBranch").val());
            formData.append("txtSemester", $("#txtSemester").val());
            formData.append("txtPassword", $("#txtPassword").val());
            formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());


            $.ajax({ 
              url: "/add/student/",
              type: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function(response) {

               if(response == 10) {
                  alert("You are already Registered, Please try to Login");
               } else {

                   alert("Registered successfully");
                   // location.reload();
                   window.location = '/web_login/';

                 }
              }

            });
          }
      });
