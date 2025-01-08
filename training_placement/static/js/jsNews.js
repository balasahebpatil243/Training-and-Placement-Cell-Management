
$("#btn_add").click(function (e) {
  //verification
  //verification
  if ($("#txtImage").val().trim().length < 1) {
    snackbar_error("Please Select Image");
    $("#txtImage").focus();
    return false;
  }

  if ($("#txtTitle").val().trim().length < 1) {
    snackbar_error("Please Enter File Description");
    $("#txtTitle").focus();
    return false;
  }

  if ($("#txtDate").val().trim().length < 1) {
    snackbar_error("Please Upload file");
    $("#txtDate").focus();
    return false;
  }

  var formData = new FormData();

  var lclImage = document.getElementById("txtImage");
  lclImage1 = lclImage.files[0];
  formData.append("phPhoto", lclImage1);

  formData.append("txtTitle", $("#txtTitle").val());
  formData.append("txtContent", $("#txtContent").val());  
  formData.append("txtDate", $("#txtDate").val());

  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  // var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/news/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Workshop details Added Successfully");
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
    getNewsData();
  // });

  $.fn.dataTableExt.errMode = 'ignore';
  //show data
  // var table = $("#tableData").DataTable();

    // table.on( 'draw.dt', function () {
    // var PageInfo = $('#tableData').DataTable().page.info();
    //      table.column(0, { page: 'current' }).nodes().each( function (cell, i) {
    //         cell.innerHTML = i + 1;
    //     });
    // });

  //Edit modal submit click
  $(document).on("click", "#btn_update", function () {
 
    // if ($("#txtImage1").val().trim().length < 1) {
    //     snackbar_error("Please Upload File");
    //     $("#txtImage1").focus();
    //     return false;
    // }

    if ($("#txtTitle1").val().trim().length < 1) {
        snackbar_error("Please Enter Title");
        $("#txtTitle1").focus();
        return false;
    }

    if ($("#txtContent1").val().trim().length < 1) {
        snackbar_error("Please Enter Content");
        $("#txtContent1").focus();
        return false;
    }

    if ($("#txtDate1").val().trim().length < 1) {
        snackbar_error("Please Enter Date");
        $("#txtDate1").focus();
        return false;
    }

    
    var formData = new FormData()

    formData.append("txtTitle1", $("#txtTitle1").val());
    formData.append("txtContent1", $("#txtContent1").val());  
    formData.append("txtDate1", $("#txtDate1").val());

    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    // var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/news/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("News Details Updated Succesfully");
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

    // var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/delete/news/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("News Details deleted succesfully");
        location.reload();
        // table.ajax.reload();
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

function getNewsData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/news/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].na_id+'</td><td>'+response[i].na_image+'</td><td>'+response[i].na_title+'</td><td>'+response[i].na_content+'</td><td>'+response[i].na_date+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
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
      var lclName = currentRow.find("td:eq(3)").text();
      var lclContent = currentRow.find("td:eq(4)").text();
      var lclDate = currentRow.find("td:eq(5)").text();

      // alert(lclName);
      $("#txtTitle1").val(lclName);
      $("#txtContent1").val(lclContent);
      $("#txtDate1").val(lclDate);


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

getNewsData();