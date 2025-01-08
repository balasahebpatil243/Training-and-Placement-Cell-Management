
function getJobAppliedData() {

  var formData = new FormData();
  formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

  $.ajax({

      url: "/get_data/JobApplied/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $("#tableData tr:gt(0)").remove();
        for(var i = 0; i < response.length; i++) {
          var imgSub = response[i].ja_resume.substring(18);
          var j = i + 1;
          $("#tableData").append('<tr><td>'+j+'</td><td style="display: none;">'+response[i].ja_id+'</td><td>'+response[i].ja_title+'</td><td>'+response[i].ja_company_name+'</td><td>'+response[i].ja_name+'</td><td>'+response[i].ja_mobile+'</td><td>'+response[i].ja_email+'</td><td>'+response[i].ja_usn+'</td><td>'+response[i].ja_branch+'</td><td><a href="'+imgSub+'" download>Download</a></td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();"> <i class="far fa-trash-alt"></i></a></div></td></tr>');
        }
      },
      error: function (request, error) {
        console.error(error);
      },
      complete: function () {

      },
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

  //Delete work shop
  $(document).on("click", "#btn_delete", function () {

    var formData = new FormData();
    formData.append("id", $("#delete_id").val());
    formData.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

    var table = $("#tableData").DataTable();

    $.ajax({
      beforeSend: function () {
        $(".btn .spinner-border").show();
      },

      url: "/delete/jobApplied/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        snackbar_success("job Details deleted succesfully");
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


getJobAppliedData();