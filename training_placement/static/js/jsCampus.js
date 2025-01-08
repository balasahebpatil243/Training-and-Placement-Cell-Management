
$("#btn_add").click(function (e) {
  //verification
  //verification
  if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter File Name");
    $("#txtName").focus();
    return false;
  }

  if ($("#txtCompanyName").val().trim().length < 1) {
    snackbar_error("Please Enter File Description");
    $("#txtCompanyName").focus();
    return false;
  }
  if ($("#txtCampusDate").val().trim().length < 1) {
    snackbar_error("Please Enter File Description");
    $("#txtCampusDate").focus();
    return false;
  }

  if ($("#txtCampusDuration").val().trim().length < 1) {
    snackbar_error("Please Upload file");
    $("#txtCampusDuration").focus();
    return false;
  }

  var formData = new FormData();
  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtCompanyName", $("#txtCompanyName").val());
  formData.append("txtCampusDate", $("#txtCampusDate").val());
  formData.append("txtCampusDuration", $("#txtCampusDuration").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/campus/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Campus details Added Successfully");
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
    // getWorkshopData();
  // });

  $.fn.dataTableExt.errMode = 'ignore';
  //show data
  var table = $("#tableData").DataTable();

    table.on( 'draw.dt', function () {
    var PageInfo = $('#tableData').DataTable().page.info();
         table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1;
        });
    });

  //Edit modal submit click
  $(document).on("click", "#btn_update", function () {

  if ($("#txtName1").val().trim().length < 1) {
        snackbar_error("Please Enter File Name");
        $("#txtName1").focus();
        return false;
    }

    if ($("#txtCompanyName1").val().trim().length < 1) {
        snackbar_error("Please Enter File description");
        $("#txtCompanyName1").focus();
        return false;
    }

    if ($("#txtCampusDate1").val().trim().length < 1) {
        snackbar_error("Please upload file");
        $("#txtCampusDate1").focus();
        return false;
    }
     if ($("#txtCampusDuration1").val().trim().length < 1) {
        snackbar_error("Please upload file");
        $("#txtCampusDuration1").focus();
        return false;
    }



    
    var formData = new FormData()

    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtCompanyName1", $("#txtCompanyName1").val());
    formData.append("txtCampusDate1", $("#txtCampusDate1").val());
    formData.append("txtCampusDuration1", $("#txtCampusDuration1").val());    
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/campus/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Workshop Details Updated Succesfully");
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

      url: "/delete/campus/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Campus Details deleted succesfully");
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

function getCampusData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/campus/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].ca_id+'</td><td>'+response[i].ca_clg_name+'</td><td>'+response[i].ca_cmp_name+'</td><td>'+response[i].ca_date+'</td><td>'+response[i].ca_duration+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
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
      var lclName = currentRow.find("td:eq(2)").text();
      var lclCompany = currentRow.find("td:eq(3)").text();
      var lclCampus = currentRow.find("td:eq(4)").text();
      var lclDuration = currentRow.find("td:eq(5)").text();

      // alert(lclName);
      $("#txtName1").val(lclName);
      $("#txtCompanyName1").val(lclCompany);
      $("#txtCampusDate1").val(lclCampus);
      $("#txtCampusDuration1").val(lclDuration);
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

getCampusData();