
$("#btn_add").click(function (e) {
  //verification
 
   if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter Student Name");
    $("#txtName").focus();
    return false;
  }

    if ($("#txtBranch").val().trim().length < 1) {
    snackbar_error("Please Enter Student Branch");
    $("#txtBranch").focus();
    return false;
  }

   if ($("#txtGender").val().trim().length < 1) {
    snackbar_error("Please Enter Student Gender");
    $("#txtGender").focus();
    return false;
  }

   if ($("#txtUsn").val().trim().length < 1) {
    snackbar_error("Please Enter USN");
    $("#txtUsn").focus();
    return false;
  }


  if ($("#txtPlacedCompany").val().trim().length < 1) {
    snackbar_error("Please Enter Student Placed Company");
    $("#txtPlacedCompany").focus();
    return false;
  }

  if ($("#txtPlacedYear").val().trim().length < 1) {
    snackbar_error("Please Enter Placed Year");
    $("#txtPlacedYear").focus();
    return false;
  }

   if ($("#txtPackage") .val().trim().length< 1) {
    snackbar_error("Please Enter Package");
    $("#txtPackage").focus();
    return false;
  }
  var formData = new FormData();
  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtBranch", $("#txtBranch").val());
  formData.append("txtGender", $("#txtGender").val());  
  formData.append("txtUsn", $("#txtUsn").val());
  formData.append("txtPlacedCompany", $("#txtPlacedCompany").val());
  formData.append("txtPlacedYear", $("#txtPlacedYear").val());
  formData.append("txtPackage", $("#txtPackage").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/placement/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Student Placement Details Added Successfully");
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
    getPlacementData();
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

  if ($("#txtUsn1").val().trim().length < 1) {
    snackbar_error("Please Enter USN");
    $("#txtUsn1").focus();
    return false;
  }

  if ($("#txtName1").val().trim().length < 1) {
    snackbar_error("Please Enter Student Name");
    $("#txtName1").focus();
    return false;
  }

   if ($("#txtGender1").val().trim().length < 1) {
    snackbar_error("Please Enter Student Gender");
    $("#txtGender1").focus();
    return false;
  }

  if ($("#txtBranch1").val().trim().length < 1) {
    snackbar_error("Please Enter Student Branch");
    $("#txtBranch1").focus();
    return false;
  }

  if ($("#txtPlacedCompany1").val().trim().length < 1) {
    snackbar_error("Please Enter Student Placed Company");
    $("#txtPlacedCompany1").focus();
    return false;
  }

  if ($("#txtPlacedYear1").val().trim().length < 1) {
    snackbar_error("Please Enter Placed Year");
    $("#txtPlacedYear1").focus();
    return false;
  }

   if ($("#txtPackage1") .val().trim().length< 1) {
    snackbar_error("Please Enter Package");
    $("#txtPackage1").focus();
    return false;
  }

    
    var formData = new FormData()
    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtGender1", $("#txtGender1").val());
    formData.append("txtBranch1", $("#txtBranch1").val());
    formData.append("txtUsn1", $("#txtUsn1").val());
    formData.append("txtPlacedCompany1", $("#txtPlacedCompany1").val());
    formData.append("txtPlacedYear1", $("#txtPlacedYear1").val());
    formData.append("txtPackage1", $("#txtPackage1").val());
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/placement/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Student Placement Details Updated Succesfully");
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

      url: "/delete/placement/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Student placement Details deleted succesfully");
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

function getPlacementData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/placement/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].pl_id+'</td><td>'+response[i].pl_name+'</td><td>'+response[i].pl_branch+'</td><td>'+response[i].pl_gender+'</td><td>'+response[i].pl_usn+'</td><td>'+response[i].pl_company+'</td><td>'+response[i].pl_year+'</td><td>'+response[i].pl_package+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
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
      var lclGender = currentRow.find("td:eq(4)").text();
      var lclBranch = currentRow.find("td:eq(3)").text();
      var lclUsn = currentRow.find("td:eq(5)").text();
      var lclCompany = currentRow.find("td:eq(6)").text();
      var lclyear = currentRow.find("td:eq(7)").text();
      var lclPackage = currentRow.find("td:eq(8)").text();
      

      // alert(lclName);
      $("#txtName1").val(lclName);
      $("#txtGender1").val(lclGender);
      $("#txtBranch1").val(lclBranch);
      $("#txtUsn1").val(lclUsn);
      $("#txtPlacedCompany1").val(lclCompany);
      $("#txtPlacedYear1").val(lclyear);
      $("#txtPackage1").val(lclPackage);

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

getPlacementData();