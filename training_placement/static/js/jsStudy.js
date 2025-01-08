
$("#btn_add").click(function (e) {
  //verification
 
   if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter File Name");
    $("#txtName").focus();
    return false;
  }

  if ($("#txtAttachDate").val().trim().length < 1) {
    snackbar_error("Please Enter File Attached Date");
    $("#txtAttachDate").focus();
    return false;
  }

  if ($("#txtFile").val().trim().length < 1) {
    snackbar_error("Please Upload file");
    $("#txtFile").focus();
    return false;
  }

  var formData = new FormData();
  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtAttachDate", $("#txtAttachDate").val());

  var lclFile = document.getElementById("txtFile");
  lclFile1 = lclFile.files[0];
  formData.append("txtFile", lclFile1);

  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  // var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/study/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Study Material Added Successfully");
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
    getStudyData();
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

    if ($("#txtAttachDate1").val().trim().length < 1) {
        snackbar_error("Please Enter File atttached date");
        $("#txtAttachDate1").focus();
        return false;
    }

    if ($("#txtFileText1").val().trim().length < 1) {
        snackbar_error("Please upload file");
        $("#txtFileText1").focus();
        return false;
    }


    
    var formData = new FormData()
    
     if($("#txtFile1").val() != "") {
      var lclFile = document.getElementById("txtFile1");
      lclFile1 = lclFile.files[0];
      formData.append("txtFile1", lclFile1);
      $("#txtFileText1").val('');
    }
    
    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtAttachDate1", $("#txtAttachDate1").val());
    formData.append("txtFileText1", $("#txtFileText1").val());
    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/study/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Study Material Updated Succesfully");
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

      url: "/delete/study/",
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



function getRowsUpdate() {
  $("#tableData tr").click(function() {
      var currentRow = $(this).closest("tr");
      var lclID = currentRow.find("td:eq(1)").text();
      var lclName = currentRow.find("td:eq(2)").text();
      var lclDate = currentRow.find("td:eq(3)").text();
      var lclFile = currentRow.find("td:eq(4)").text();
      
      

      // alert(lclName);
      $("#txtName1").val(lclName);
      $("#txtAttachDate1").val(lclDate);
      $("#txtFileText1").val(lclFile);

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

getStudyData();