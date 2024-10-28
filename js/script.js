$(document).ready(() => {
  function checkEmptyInput(data) {
    let empInput = [];

    for (const [key, value] of Object.entries(data)) {
      if (isNaN(value)) {
        empInput.push(key);
      }
    }

    return empInput;
  }

  function calcBED(data, id) {
    data.bed = parseFloat(data.bed);
    data.n = parseFloat(data.n);
    data.k = parseFloat(data.k);
    data.d = parseFloat(data.d);
    data.t = parseFloat(data.t);
    data.ab = parseFloat(data.ab);
    data.tk = parseFloat(data.tk);

    checkEmptyInput(data);

    if (isNaN(data.n)) {
      data.n =
        ((data.bed + data.k * (data.t - data.tk)) / data.d) *
        (data.ab / (data.ab + data.d));

      $("#n-" + id)[0].value = data.n;
      $("#bed-" + id).removeClass("fw-bold");
      $("#n-" + id).addClass("fw-bold");
    } else {
      data.bed =
        data.n * data.d * ((data.ab + data.d) / data.ab) -
        data.k * (data.t - data.tk);

      $("#bed-" + id)[0].value = data.bed;
      $("#bed-" + id).addClass("fw-bold");
    }

    console.log(data);
  }

  $(".btn-success").click(function (e) {
    e.preventDefault();

    let dataId = $(this).data("id");

    let formData = new FormData($("#form-" + dataId)[0]);
    let objData = Object.fromEntries(formData.entries());

    calcBED(objData, dataId);
  });

  $(".btn-danger").click(function (e) {
    e.preventDefault();

    let dataId = $(this).data("id");
    $(`#form-${dataId}`)[0].reset();
  });
});
