$("#btn_add").click(function (e) {
  //verification
  // if ($("#selSubject").val().trim().length < 1) {
  //   alert("Please Select Subject");
  //   $("#selSubject").focus();
  //   return false;
  // }
  if ($("#dateTestDate").val().trim().length < 1) {
    alert("Please Select Date");
    $("#dateTestDate").focus();
    return false;
  }
 if ($("#timeStartTime").val().trim().length < 1) {
    alert("Please Select Start Time");
    $("#timeStartTime").focus();
    return false;
  }
  if ($("#timeEndTime").val().trim().length < 1) {
    alert("Please Select End Time");
    $("#timeEndTime").focus();
    return false;
  }
  if ($("#txtName").val().trim().length < 1) {
    alert("Please Enter Test Name");
    $("#txtName").focus();
    return false;
  }

  //append data
  var formData = new FormData();
  // formData.append("selSubject", $("#selSubject").val());
  formData.append("dateTestDate", $("#dateTestDate").val());
  formData.append("timeStartTime", $("#timeStartTime").val());
  formData.append("timeEndTime", $("#timeEndTime").val());
  formData.append("txtName", $("#txtName").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  $("#txtQuestions1").val("");
  $("#questions input:checked").each(function() {

      var lclSplitValue = $(this).attr('value');
      // alert(lclSplitValue);

      if($("#txtQuestions1").val() != "") {
          $("#txtQuestions1").val($("#txtQuestions1").val() + "[]" +lclSplitValue);
        } else {
        $("#txtQuestions1").val(lclSplitValue);
      }
                
    });

  if($("#txtQuestions1").val() == "") {
    alert("Please Select Questions");
    return false;
  }

  formData.append("txtQuestions1", $("#txtQuestions1").val());

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/configure_test_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      // alert(result);
      if(result.trim() == "10") {
        alert("Something Went Wrong");
      } else {
        alert("Test Created Successfully");
        location.reload();
        // $("#add_modal").modal('hide');
      }
      
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_add").attr("disabled", false);
    },
  });
});
// var sl_no = 0;
// ADD Testimnials data Table (DONE)
function getAdminData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "getData");

  $.ajax({

      url: "/configure_test_details/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].ct_id+'</td><td>'+response[i].ct_date+'</td><td>'+response[i].ct_start_time+'</td><td>'+response[i].ct_end_time+'</td><td>'+response[i].ct_test_name+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a></div></td></tr>');
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
    });

}

function getAdminData1() {
  // alert("Hi");
  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/question_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var k = i + 1;
          $("#questions").append("<tr><td>"+k+"</td><td>"+"<input type ='checkbox' id='checkbox"+k+"' value='"+response[i].qm_id+"'></td><td>"+response[i].qm_name+"</td></tr>");
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
    });

}

getAdminData1();

  //Edit modal submit click
  $(document).on("click", "#btn_update", function () {

  if ($("#txtQuestion1").val().trim().length < 1) {
    alert("Please Enter Question");
    $("#txtQuestion1").focus();
    return false;
  }
  if ($("#txtOption11").val().trim().length < 1) {
    alert("Please Enter Option1");
    $("#txtOption11").focus();
    return false;
  }
 if ($("#txtOption22").val().trim().length < 1) {
    alert("Please Enter Option2");
    $("#txtOption22").focus();
    return false;
  }
  if ($("#txtOption33").val().trim().length < 1) {
    alert("Please Enter Option3");
    $("#txtOption33").focus();
    return false;
  }
  if ($("#txtOption44").val().trim().length < 1) {
    alert("Please Enter Option4");
    $("#txtOption44").focus();
    return false;
  }
  if ($("#txtAnswer1").val().trim().length < 1) {
    alert("Please Enter Answer");
    $("#txtAnswer1").focus();
    return false;
  }

 
    
    var formData = new FormData()
    formData.append("txtQuestion1", $("#txtQuestion1").val());
    formData.append("txtOption11", $("#txtOption11").val());
    formData.append("txtOption22", $("#txtOption22").val());
    formData.append("txtOption33", $("#txtOption33").val());
    formData.append("txtOption44", $("#txtOption44").val());
    formData.append("txtAnswer1", $("#txtAnswer1").val());
    formData.append("action", "update");
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
    formData.append("id", $("#edit_id").val());

    // var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/question_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        alert("Question Details Updated Succesfully");
        location.reload();
        table.ajax.reload();
        $("#edit_modal").modal('hide');
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {
        $(".btn .spinner-border").hide();
        $("#btn_update").attr("disabled", false);
      },
    });
  });

  //Delete work step
  $(document).on("click", "#btn_delete", function () {

    var formData = new FormData();
    formData.append("id", $("#delete_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
    formData.append("action", "delete");


    // var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/configure_test_details/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        alert("Test Details deleted succesfully");
        location.reload();
        table.ajax.reload();
        $("#delete_modal").modal('hide');
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {
        $(".btn .spinner-border").hide();
        // Reset Form
        //$("#view_field_form")[0].reset();
        $(".close").click();
      },
    });
  });

  function getSubject() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
 

  $.ajax({


      url: "/get_subject/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        for(var i = 0; i < response.length; i++) {
          $("#selSubject").append("<option value='"+response[i].su_subject+"'>"+response[i].su_subject+"</option>");
          $("#selSubject1").append("<option value='"+response[i].su_subject+"'>"+response[i].su_subject+"</option>");
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
    });

}
// getSubject();


  function getRowsUpdate() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      var lclQuestion = currentRow.find("td:eq(3)").text();
      var lclOption1 = currentRow.find("td:eq(4)").text();
      var lclOption2 = currentRow.find("td:eq(5)").text();
      var lclOption3 = currentRow.find("td:eq(6)").text();
      var lclOption4 = currentRow.find("td:eq(7)").text();
      var lclAnswer = currentRow.find("td:eq(8)").text();

      // alert(lclName);
      $("#txtQuestion1").val(lclQuestion);
      $("#txtOption11").val(lclOption1);
      $("#txtOption22").val(lclOption2);
      $("#txtOption33").val(lclOption3);
      $("#txtOption44").val(lclOption4);
      $("#txtAnswer1").val(lclAnswer);
      $("#edit_id").val(lclID);

  });
}


function getRowsDelete() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      // alert(lclID);
      $("#delete_id").val(lclID);

  });
}


  $(document).on("click", "#add_user", function () {

    $("#txtName").val('');
    $("#txtEmail").val('');
    $("#txtMobileNo").val('');
    $("#txtPassword").val('');
    $("#selRole").val('');
    $("#txtName").focus('');

  });
getAdminData();


