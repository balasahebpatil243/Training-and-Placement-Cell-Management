   window.onload = function() {
            loadPlacementDetails();
            loadAnnualPlacementDetails();
        }

        function loadPlacementDetails() {

          var formData = new FormData();        
          formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

              $.ajax({

                  url: "/get_placement_details/",
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
                      // $("#placement").empty();
                      for(var i = 0; i < lclJSON.length; i++) {
                        $("#placement").append('<tr><td>'+lclJSON[i].pl_name+'</td><td>'+lclJSON[i].pl_branch+'</td><td>'+lclJSON[i].pl_usn+'</td><td>'+lclJSON[i].pl_company+'</td><td>'+lclJSON[i].pl_year+'</td><td>'+lclJSON[i].pl_package+'</td></tr>');                        
                      }
                    }

              });          
        }

        function loadAnnualPlacementDetails() {

          var formData = new FormData();
          formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

              $.ajax({

                  url: "/get_annual_placement_details/",
                  type: "POST",
                  data: formData,
                  processData: false,
                  contentType: false,
                  success: function(response) {

                    var lclJSON = JSON.parse(response);
                    // if(lclJSON.length != 0) {
                      // $("#annual_placement").empty();
                      for(var i = 0; i < lclJSON.length; i++) {
                        $("#annual_placement").append('<tr><td>'+lclJSON[i].ap_no_of_boys+'</td><td>'+lclJSON[i].ap_no_of_girls+'</td><td>'+lclJSON[i].ap_placement_year+'</td><td>'+lclJSON[i].ap_company_name+'</td></tr>');                        
                      }
                    }

              });          
        }
