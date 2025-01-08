
   function validateEmail(paramEmailID) {
        var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;
        
        if (filter.test(paramEmailID)) {
          return true;
        } else {
          return false;
        }
      }

      function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
      }

   
   $( document ).ready(function() {

          $("#btn_submit").click(function() {

            if($("#txtName").val() == "") {
               alert("Please Enter Your Name");
               $("#txtName").focus();
               return false;
            }

            if($("#txtSubject").val() == "") {
               alert("Please Enter Subject");
               $("#txtSubject").focus();
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

            if($("#txtMessage").val() == "") {
               alert("Please Enter Message");
               $("#txtMessage").focus();
               return false;
            }

            $("#btn_submit").prop("disabled", true);
            $("#btn_submit").text('Sending Mail...');
             sendMessage();
       
          });

          function sendMessage() {
            // alert("alert");
            var formData = new FormData();
            formData.append("txtName", $("#txtName").val());
            formData.append("txtEmail", $("#txtEmail").val());
            formData.append("txtSubject", $("#txtSubject").val());
            formData.append("txtMessage", $("#txtMessage").val());
            formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

            formData.append("action", 'contact');

            $.ajax({ 
              url: "/add/contact/",
              type: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function(response) {

               // if(response == 1){

                   alert("Thank you, We will get back to you soon.");
                   $("#btn_submit").prop("disabled", false);
                   $("#btn_submit").text('Send Message');
                   $("#txtName").val("");
                   $("#txtEmail").val("");
                   $("#txtSubject").val("");
                   $("#txtMessage").val("");
                   $("#txtName").focus();
              }

            });
          }
      });
