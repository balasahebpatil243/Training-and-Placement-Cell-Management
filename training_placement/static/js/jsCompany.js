
    function validateEmail(paramEmailID) {
      var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;
      
      if (filter.test(paramEmailID)) {
        return true;
      } else {
        return false;
      }
    }

      function validateEmail(paramEmailID) {
        var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;
        
        if (filter.test(paramEmailID)) {
          return true;
        } else {
          return false;
        }
      }

    

$("#btn_add").click(function (e) {
  //verification
  if ($("#txtName").val().trim().length < 1) {
    snackbar_error("Please Enter Company Name");
    $("#txtName").focus();
    return false;
  }

  if ($("#txtHeadOffice").val().trim().length < 1) {
    snackbar_error("Please Enter Company Head office");
    $("#txtHeadOffice").focus();
    return false;
  }

  if ($("#txtBranches").val().trim().length < 1) {
    snackbar_error("Please Enter Company Branches");
    $("#txtBranches").focus();
    return false;
  }
  if ($("#txtWorkingField").val().trim().length < 1) {
    snackbar_error("Please Enter Working Field of Company");
    $("#txtWorkingField").focus();
    return false;
  }
  if ($("#txtEmployees").val().trim().length < 1) {
    snackbar_error("Please Enter No of Employees");
    $("#txtEmployees").focus();
    return false;
  }
  if ($("#txtAchievement").val().trim().length < 1) {
    snackbar_error("Please Enter Company Achievements");
    $("#txtAchievement").focus();
    return false;
  }
  if ($("#txtAddress").val().trim().length < 1) {
    snackbar_error("Please Enter Company Address");
    $("#txtAddress").focus();
    return false;
  }
   if ($("#txtMobileNo").val().trim().length < 1) {
    snackbar_error("Please Enter Company Phone No");
    $("#txtMobileNo").focus();
    return false;
  }
    if ($("#txtMobileNo").val().trim().length < 10) {
    snackbar_error("Please Enter 10 Digits Mobile Number");
    $("#txtMobileNo").focus();
    return false;
  }
   if ($("#txtEmail").val().trim().length < 1) {
    snackbar_error("Please Enter Company Email");
    $("#txtEmail").focus();
    return false;
  }
    if(!validateEmail($("#txtEmail").val())) {
     snackbar_error("Please Enter valid Email");
     $("#txtEmail").focus();
     return false;
  }


  var formData = new FormData();
  
  formData.append("txtName", $("#txtName").val());
  formData.append("txtMobileNo", $("#txtMobileNo").val());
  formData.append("txtEmail", $("#txtEmail").val());
  formData.append("txtAddress", $("#txtAddress").val());
  formData.append("txtHeadOffice", $("#txtHeadOffice").val());
  formData.append("txtBranches", $("#txtBranches").val());
  formData.append("txtWorkingField", $("#txtWorkingField").val());
  formData.append("txtEmployees", $("#txtEmployees").val());
  formData.append("txtAchievement", $("#txtAchievement").val());  
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());
  formData.append("action", "add");

  var table = $("#tableData").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add/company/",
    type: "POST",
    // headers: {'X-CSRFToken': '{{ csrf_token }}'},
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {

        snackbar_success("Company Details Added Successfully");
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
    getCompanyData();
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
    snackbar_error("Please Enter Company Name");
    $("#txtName1").focus();
    return false;
  }

  if ($("#txtHeadOffice1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Head office");
    $("#txtHeadOffice1").focus();
    return false;
  }

  if ($("#txtBranches1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Branches");
    $("#txtBranches1").focus();
    return false;
  }
  if ($("#txtWorkingField1").val().trim().length < 1) {
    snackbar_error("Please Enter Working Field of Company");
    $("#txtWorkingField1").focus();
    return false;
  }
  if ($("#txtEmployees1").val().trim().length < 1) {
    snackbar_error("Please Enter No of Employees");
    $("#txtEmployees1").focus();
    return false;
  }
  if ($("#txtAchievement1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Achievements");
    $("#txtAchievement1").focus();
    return false;
  }
  if ($("#txtAddress1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Address");
    $("#txtAddress1").focus();
    return false;
  }
   if ($("#txtMobileNo1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Phone No");
    $("#txtMobileNo1").focus();
    return false;
  }
    if ($("#txtMobileNo1").val().trim().length < 10) {
    snackbar_error("Please Enter 10 Digits Mobile Number");
    $("#txtMobileNo1").focus();
    return false;
  }
   if ($("#txtEmail1").val().trim().length < 1) {
    snackbar_error("Please Enter Company Email");
    $("#txtEmail1").focus();
    return false;
  }
    if(!validateEmail($("#txtEmail1").val())) {
     snackbar_error("Please Enter valid Email");
     $("#txtEmail1").focus();
     return false;
  }

  function validateEmail(paramEmailID) {
        var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;
        
        if (filter.test(paramEmailID)) {
          return true;
        } else {
          return false;
        }
      }

    
    var formData = new FormData()
    formData.append("txtName1", $("#txtName1").val());
    formData.append("txtMobileNo1", $("#txtMobileNo1").val());
    formData.append("txtEmail1", $("#txtEmail1").val());
    formData.append("txtAddress1", $("#txtAddress1").val());
    formData.append("txtHeadOffice1", $("#txtHeadOffice1").val());
    formData.append("txtBranches1", $("#txtBranches1").val());
    formData.append("txtWorkingField1", $("#txtWorkingField1").val());
    formData.append("txtEmployees1", $("#txtEmployees1").val());
    formData.append("txtAchievement1", $("#txtAchievement1").val());    

    formData.append("id", $("#edit_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
        $("#btn_update").attr("disabled", true);
      },
      url: "/update/company/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (result) {
        snackbar_success("Company Details Updated Succesfully");
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

      url: "/delete/company/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("Company Details deleted succesfully");
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

function getCompanyData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/company/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].cm_id+'</td><td>'+response[i].cm_name+'</td><td>'+response[i].cm_mobile+'</td><td>'+response[i].cm_email+'</td><td>'+response[i].cm_address+'</td><td>'+response[i].cm_head_office+'</td><td>'+response[i].cm_branches+'</td><td>'+response[i].cm_working_field+'</td><td>'+response[i].cm_employees+'</td><td>'+response[i].cm_achievements+'</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();"> <i class="fas fa-pen"></i></a><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
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
      var lclMobile = currentRow.find("td:eq(3)").text();
      var lclEmail = currentRow.find("td:eq(4)").text();
      var lclAddress = currentRow.find("td:eq(5)").text();
      var lclOffice = currentRow.find("td:eq(6)").text();
      var lclBranches = currentRow.find("td:eq(7)").text();
      var lclWorkingField = currentRow.find("td:eq(8)").text();
      var lclEmployees = currentRow.find("td:eq(9)").text();
      var lclAchievements = currentRow.find("td:eq(10)").text();

      // alert(lclName);
      $("#txtName1").val(lclName);
      $("#txtEmail1").val(lclEmail);
      $("#txtMobileNo1").val(lclMobile);
      $("#txtAddress1").val(lclAddress);
      $("#txtHeadOffice1").val(lclOffice);
      $("#txtBranches1").val(lclBranches);
      $("#txtWorkingField1").val(lclWorkingField);
      $("#txtEmployees1").val(lclEmployees);
      $("#txtAchievement1").val(lclAchievements);

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

getCompanyData();