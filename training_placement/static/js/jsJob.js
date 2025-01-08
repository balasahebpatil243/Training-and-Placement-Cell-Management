
$("#btn_add").click(function (e) {
  //verification
 

  if ($("#txtJobTitle").val().trim().length < 1  ) {
    snackbar_error("Please Enter Job Title");
    $("#txtJobTitle").focus();
    return false;
  }

  if ($("#txtSkills").val().trim().length < 1) {
    snackbar_error("Please Enter Skills");
    $("#txtSkills").focus();
    return false;
  }
  if ($("#txtDescription").val().trim().length < 1) {
    snackbar_error("Please Enter Job description");
    $("#txtDescription").focus();
    return false;
  }
  if ($("#txtLocation").val().trim().length < 1) {
    snackbar_error("Please Job location");
    $("#txtLocation").focus();
    return false;
  }

  if ($("#txtPercentage").val().trim().length < 1) {
    snackbar_error("Please Enter Minimum Percentage");
    $("#txtPercentage").focus();
    return false;
  }
  if ($("#txtPackage").val().trim().length < 1) {
    snackbar_error("Please Enter Package");
    $("#txtPackage").focus();
    return false;
  }
  if ($("#txtVacancies").val().trim().length < 1) {
    snackbar_error("Please Enter Vacancies");
    $("#txtVacancies").focus();
    return false;
  }

  var formData = new FormData();
  
  formData.append("txtJobTitle", $("#txtJobTitle").val());
  formData.append("txtSkills", $("#txtSkills").val());
  formData.append("txtDescription", $("#txtDescription").val());
  formData.append("txtLocation", $("#txtLocation").val());
  formData.append("txtPercentage", $("#txtPercentage").val());
  formData.append("txtPackage", $("#txtPackage").val());
  formData.append("txtVacancies", $("#txtVacancies").val());

  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  // var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/job/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Job Details Added Successfully");
        location.reload();
        // table.ajax.reload();
        $("#add_modal").modal('hide');
      
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
$(document).ready(function () {

  // $(window).on("load", function () {
    // alert("Hello");
    getJobData();
  // });

  // $.fn.dataTableExt.errMode = 'ignore';
  // //show data
  // var table = $("#tableData").DataTable();

  //   table.on( 'draw.dt', function () {
  //   var PageInfo = $('#tableData').DataTable().page.info();
  //        table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
  //           cell.innerHTML = i + 1;
  //       });
  //   });

  //Edit modal submit click
  $(document).on("click", "#btn_update", function () {

   if ($("#txtJobTitle1").val().trim().length < 1  ) {
    snackbar_error("Please Enter Job Title");
    $("#txtJobTitle1").focus();
    return false;
  }

  if ($("#txtSkills1").val().trim().length < 1) {
    snackbar_error("Please Enter Skills");
    $("#txtSkills1").focus();
    return false;
  }
  if ($("#txtDescription1").val().trim().length < 1) {
    snackbar_error("Please Enter Job description");
    $("#txtDescription1").focus();
    return false;
  }
  if ($("#txtLocation1").val().trim().length < 1) {
    snackbar_error("Please Job location");
    $("#txtLocation1").focus();
    return false;
  }

  if ($("#txtPercentage1").val().trim().length < 1) {
    snackbar_error("Please Enter Minimum Percentage");
    $("#txtPercentage1").focus();
    return false;
  }
  if ($("#txtPackage1").val().trim().length < 1) {
    snackbar_error("Please Enter Package");
    $("#txtPackage1").focus();
    return false;
  }
  if ($("#txtVacancies1").val().trim().length < 1) {
    snackbar_error("Please Enter Vacancies");
    $("#txtVacancies1").focus();
    return false;
  }
    
    var formData = new FormData()
    formData.append("txtJobTitle1", $("#txtJobTitle1").val());
    formData.append("txtSkills1", $("#txtSkills1").val());
    formData.append("txtDescription1", $("#txtDescription1").val());
    formData.append("txtLocation1", $("#txtLocation1").val());
    formData.append("txtPercentage1", $("#txtPercentage1").val());
    formData.append("txtPackage1", $("#txtPackage1").val());
    formData.append("txtVacancies1", $("#txtVacancies1").val());
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/job/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Job Details Updated Succesfully");
        location.reload();
        // table.ajax.reload();
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

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/delete/job/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Job Details deleted succesfully");
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

  $(document).on("click", "#add_user", function () {

    $("#txtName").val('');
    $("#txtEmail").val('');
    $("#txtMobileNo").val('');
    $("#txtAddress").val('');

  });
});

function getJobData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/job/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].jb_id+'</td><td>'+response[i].jb_title+'</td><td>'+response[i].jb_skills+'</td><td>'+response[i].jb_des+'</td><td>'+response[i].jb_loc+'</td><td>'+response[i].jb_per+'</td><td>'+response[i].jb_package+'</td><td>'+response[i].jb_vac+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
    });

}

function getRowsUpdate() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      var lclTitle = currentRow.find("td:eq(2)").text();
      var lclSkills = currentRow.find("td:eq(3)").text();
      var lclDesc = currentRow.find("td:eq(4)").text();
      var lclLoc = currentRow.find("td:eq(5)").text();
      var lclPer = currentRow.find("td:eq(6)").text();
      var lclPack = currentRow.find("td:eq(7)").text();
      var lcvac = currentRow.find("td:eq(8)").text();
      

      // alert(lclName);
      $("#txtJobTitle1").val(lclTitle);
      $("#txtSkills1").val(lclSkills);
      $("#txtDescription1").val(lclDesc);
      $("#txtLocation1").val(lclLoc);
      $("#txtPercentage1").val(lclPer);
      $("#txtPackage1").val(lclPack);
      $("#txtVacancies1").val(lcvac);

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

getJobData();