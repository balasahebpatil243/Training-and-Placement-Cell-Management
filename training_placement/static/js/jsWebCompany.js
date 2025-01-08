 window.onload = function() {
            loadCompanyDetails();
        }

        function loadCompanyDetails() {

          var formData = new FormData();        
          formData.append("action", "get_company_details");
          formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());


              $.ajax({

                  url: "/get_company_details/",
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
                      $("#company").empty();
                      for(var i = 0; i < lclJSON.length; i++) {
                        $("#company").append('<br><br><div class="col-md-4"><br><br><div class="banner"><h2>Company Name:-<u>'+lclJSON[i].cm_name+'</u></h2><br><p><i class="fa fa-building" aria-hidden="true"></i> <b>Company Head-Office:-</b>'+lclJSON[i].cm_head_office+'</p><p><i class="fa fa-building" aria-hidden="true"></i> <b>Company Branches:-</b>'+lclJSON[i].cm_branches+'</p><p><i class="fa fa-cogs" aria-hidden="true"></i> <b>Company Working-Field:- </b> '+lclJSON[i].cm_working_field+'</p><p><i class="fa fa-male" aria-hidden="true"></i> <b>No-of-Employees:-</b>'+lclJSON[i].cm_employees+'</p><p><i class="fa fa-trophy" aria-hidden="true"></i> <b>Company Achievements:-</b> '+lclJSON[i].cm_achievements+'</p><p><i class="fa fa-map-marker" aria-hidden="true"></i> <b>Company Address:-</b> '+lclJSON[i].cm_address+'</p><p><i class="fa fa-phone" aria-hidden="true"></i> <b>Company Phone No:-</b>'+lclJSON[i].cm_mobile+'</p><p><i class="fa fa-file-text" aria-hidden="true"></i> <b>Company Email:-</b>'+lclJSON[i].cm_email+'</p></div></div>');                        
                      }
                    }

              });          
        }
