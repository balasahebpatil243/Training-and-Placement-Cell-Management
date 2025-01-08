  // window.onload = function() {
            loadCampusDetails();
        // }

        function loadCampusDetails() {

          var formData = new FormData();        
          formData.append("action", "get_campus_details");
          formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());


              $.ajax({

                  url: "/get_campus_details/",
                  type: "POST",
                  data: formData,
                  processData: false,
                  contentType: false,
                  success: function(response) {

                      let lclJSON;
                         try {
                         lclJSON  = JSON.parse(response)
                        } catch(e) {
                          lclJSON = response
                        }
                    // if(lclJSON.length != 0) {
                      // $("#campus").empty();
                      var subTotal = 0;
                      for(var i = 0; i < lclJSON.length; i++) {
                        $("#campus").append('<div class="col-md-4"><div class="banner"><h2>Venue:-<u>'+lclJSON[i].ca_clg_name+'</u></h2><br><h4>Company:-'+lclJSON[i].ca_cmp_name+'</h4><p><i class="fa fa-calendar" aria-hidden="true"></i> Date:'+lclJSON[i].ca_date+'</p><p><i class="fa fa-clock-o" aria-hidden="true"></i> Duration:'+lclJSON[i].ca_duration+'</p><p><i class="fa fa-calendar" aria-hidden="true"></i> Posted By: '+lclJSON[i].ca_created_by+'</p></div></div>');                        
                      }
                    }

              });          
        }
