window.onload = function() {
            loadJob();
        }

        function loadJob() {

          var formData = new FormData();
          formData.append("action", "get_job");
          formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

              $.ajax({

                  url: "/get_job_details/",
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
                      $("#job").empty();
                      var subTotal = 0;
                      for(var i = 0; i < lclJSON.length; i++) {
                        $("#job").append('<div class="col-md-4" style="width: 875px;"><div class="service-item"><img src="assets/images/product-1-720x480.jpg" alt="" style="width: 339px; height: 169px;"><div class="down-content"><h4>'+lclJSON[i].jb_title+'</h4><div style="margin-bottom:10px;"><span> <sup>₹</sup>70 000  </span></div><p>'+lclJSON[i].jb_des+'</p><p style="font-weight:bold;color:blue;">'+lclJSON[i].jb_company+'</p><a href="/applyjob?id='+lclJSON[i].jb_id+'/">View Details</a></div></div> <br></div>');                        
                      }
                    }

              });          
        }
