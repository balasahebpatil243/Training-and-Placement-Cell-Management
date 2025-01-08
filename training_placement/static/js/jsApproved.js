
$("#btn_add").click(function (e) {
  //verification
  if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter File Name");
    $("#txtName").focus();
    return false;
  } 

  if ($("#txtDescription").val().trim().length < 1  ) {
    snackbar_error("Please Enter File Description");
    $("#txtDescription").focus();
    return false;
  }

  if ($("#txtFile").val().trim().length < 1) {
    snackbar_error("Please Upload file");
    $("#txtFile").focus();
    return false;
  }

    if ($("#txtCompany").val().trim().length < 1) {
    snackbar_error("Please Enter Company Name");
    $("#txtCompany").focus();
    return false;
  }

  var formData = new FormData();

  var lclFile = document.getElementById("txtFile");
  lclFile1 = lclFile.files[0];
  formData.append("txtFile", lclFile1);

  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtDescription", $("#txtDescription").val());
  formData.append("txtCompany", $("#txtCompany").val());
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/approved/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Approved Papers Added Successfully");
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
    getApprovedData();
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

    if ($("#txtDescription1").val().trim().length < 1) {
        snackbar_error("Please Enter File description");
        $("#txtDescription1").focus();
        return false;
    }


    if ($("#txtCompany1").val().trim().length < 1) {
        snackbar_error("Please Enter Company Name");
        $("#txtCompany1").focus();
        return false;
    }
    
    var formData = new FormData()

    // if($("#txtFile1").val() != "") {
    //   var lclFile = document.getElementById("txtFile1");
    //   lclFile1 = lclFile.files[0];
    //   formData.append("txtFile1", lclFile1);
    //   $("#txtFileText1").val('');
    // }
    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtDescription1", $("#txtDescription1").val());
    formData.append("txtCompany1", $("#txtCompany1").val());
    formData.append("txtFileText1", $("#txtFileText1").val());
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/approved/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Approved papers Details Updated Succesfully");
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

      url: "/delete/approved/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Approved Papers deleted succesfully");
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
    $("#txtDescription").val('');
    $("#txtCompany").val('');
    $("#txtFile").val('');
  });
});

function getRowsUpdate() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      var lclName = currentRow.find("td:eq(2)").text();
      var lclDescription = currentRow.find("td:eq(3)").text();
      var lclCompany = currentRow.find("td:eq(4)").text();
      var lclPath = currentRow.find("td:eq(5)").text();
 
      $("#txtName1").val(lclName);
      $("#txtDescription1").val(lclDescription);
      $("#txtCompany1").val(lclCompany);
      $("#txtFileText1").val(lclPath);
      $("#edit_id").val(lclID);
      // alert(lclID);

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

// getApprovedData();