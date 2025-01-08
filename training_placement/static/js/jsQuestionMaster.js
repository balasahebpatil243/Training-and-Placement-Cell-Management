$("#btn_add").click(function (e) {
  //verification
  if ($("#txtQuestion").val().trim().length < 1) {
    alert("Please Enter Question");
    $("#txtQuestion").focus();
    return false;
  }
  if ($("#txtOption1").val().trim().length < 1) {
    alert("Please Enter Option1");
    $("#txtOption1").focus();
    return false;
  }
 if ($("#txtOption2").val().trim().length < 1) {
    alert("Please Enter Option2");
    $("#txtOption2").focus();
    return false;
  }
  if ($("#txtOption3").val().trim().length < 1) {
    alert("Please Enter Option3");
    $("#txtOption3").focus();
    return false;
  }
  if ($("#txtOption4").val().trim().length < 1) {
    alert("Please Enter Option4");
    $("#txtOption4").focus();
    return false;
  }
  if ($("#txtAnswer").val().trim().length < 1) {
    alert("Please Enter Answer");
    $("#txtAnswer").focus();
    return false;
  }

  //append data
  var formData = new FormData();
  formData.append("txtQuestion", $("#txtQuestion").val());
  formData.append("txtOption1", $("#txtOption1").val());
  formData.append("txtOption2", $("#txtOption2").val());
  formData.append("txtOption3", $("#txtOption3").val());
  formData.append("txtOption4", $("#txtOption4").val());
  formData.append("txtAnswer", $("#txtAnswer").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  // var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/question_master/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      // alert(result);
      if(result.trim() == "10") {
        alert("Email already Exist, Please Check and Add");
      } else {
        alert("Question Added Successfully");
        location.reload();
        table.ajax.reload();
        $("#add_modal").modal('hide');
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

  $.ajax({

      url: "/get_data/question_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].qm_id+'</td><td>'+response[i].qm_name+'</td><td>'+response[i].qm_option1+'</td><td>'+response[i].qm_option2+'</td><td>'+response[i].qm_option3+'</td><td>'+response[i].qm_option4+'</td><td>'+response[i].qm_answer+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();">Edit</a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a></div></td></tr>');
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
    });

}




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

    // var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/delete/question_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        alert("Question Details deleted succesfully");
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


  function getRowsUpdate() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      var lclQuestion = currentRow.find("td:eq(2)").text();
      var lclOption1 = currentRow.find("td:eq(3)").text();
      var lclOption2 = currentRow.find("td:eq(4)").text();
      var lclOption3 = currentRow.find("td:eq(5)").text();
      var lclOption4 = currentRow.find("td:eq(6)").text();
      var lclAnswer = currentRow.find("td:eq(7)").text();

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


