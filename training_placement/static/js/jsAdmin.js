
function alphaOnly(event) {
  var key = event.which ? event.which : event.keyCode;
  return (
    (key >= 65 && key <= 90) ||
    key == 8 ||
    (event.charCode >= 97 && event.charCode <= 122) ||
    event.charCode == 32
  );
}

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

    // alert("Hello");

$("#btn_add").click(function (e) {
  //verification
  if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter Name");
    $("#txtName").focus();
    return false;
  }

  if ($("#txtEmail").val().trim().length < 1) {
    snackbar_error("Please Enter Email");
    $("#txtEmail").focus();
    return false;
  }

  if (!validateEmail($("#txtEmail").val())) {
    snackbar_error("Please Enter Email");
    $("#txtEmail").focus();
    return false;
  }

  if ($("#txtMobileNo").val().trim().length < 10) {
    snackbar_error("Please Enter Correct Mobile Number");
    $("#txtMobileNo").focus();
    return false;
  }

  if ($("#txtPassword").val().trim().length < 1) {
    snackbar_error("Please Enter Password");
    $("#txtPassword").focus();
    return false;
  }

  if ($("#selRole").val().trim().length < 1) {
    snackbar_error("Please Select Role");
    $("#selRole").focus();
    return false;
  }

  var formData = new FormData();
  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtEmail", $("#txtEmail").val());
  formData.append("txtMobileNo", $("#txtMobileNo").val());
  formData.append("txtPassword", $("#txtPassword").val());
  formData.append("selRole", $("#selRole").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/admin_master/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Admin Added Successfully");
        location.reload();
        table.ajax.reload();
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
      snackbar_error("Please Enter Name");
      $("#txtName11").focus();
      return false;
    }

    if ($("#txtEmail1").val().trim().length < 1) {
      snackbar_error("Please Enter Email");
      $("#txtEmail1").focus();
      return false;
    }

    if ($("#txtMobileNo1").val().trim().length < 10) {
      snackbar_error("Please Enter Correct Mobile Number");
      $("#txtMobileNo1").focus();
      return false;
    }

    if ($("#selRole1").val().trim().length < 1) {
      snackbar_error("Please Select Role");
      $("#selRole1").focus();
      return false;
    }
    
    var formData = new FormData()
    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtMobileNo1", $("#txtMobileNo1").val());
    formData.append("txtEmail1", $("#txtEmail1").val());
    formData.append("selRole1", $("#selRole1").val());
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/admin_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Admin Details Updated Succesfully");
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

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/delete/admin_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Admin Details deleted succesfully");
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
    $("#txtPassword").val('');

  });
});

function getAdminData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/admin_master/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].ad_id+'</td><td>'+response[i].ad_name+'</td><td>'+response[i].ad_mobile+'</td><td>'+response[i].ad_email+'</td><td>'+response[i].ad_role+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
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
      var lclEmail = currentRow.find("td:eq(3)").text();
      var lclMobile = currentRow.find("td:eq(4)").text();
      var lclRole = currentRow.find("td:eq(5)").text();
      // alert(lclName);
      $("#txtName1").val(lclName);
      $("#txtEmail1").val(lclEmail);
      $("#txtMobileNo1").val(lclMobile);
      $("#selRole1").val(lclRole);
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

getAdminData();