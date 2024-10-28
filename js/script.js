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

      $("#n-" + id)[0].value = data.n.toFixed(2);
      $("#bed-" + id).removeClass("fw-bold");
      $("#d-" + id).removeClass("fw-bold");
      $("#n-" + id).addClass("fw-bold");
    } else if (isNaN(data.d)) {
      const a = 1;
      const b = data.ab;
      const c = -data.ab * ((data.bed + data.k * (data.t - data.tk)) / data.n);

      const D = b * b - 4 * a * c;

      let d1 = 0;
      let d2 = 0;

      if (D > 0) {
        d1 = (-b + Math.sqrt(D)) / (2 * a);
        d2 = (-b - Math.sqrt(D)) / (2 * a);

        data.d = d1;
      } else if (D == 0) {
        data.d = -b / (2 * a);
      } else {
      }

      $("#d-" + id)[0].value = data.d.toFixed(2);
      $("#bed-" + id).removeClass("fw-bold");
      $("#n-" + id).removeClass("fw-bold");
      $("#d-" + id).addClass("fw-bold");
    } else {
      data.bed =
        data.n * data.d * ((data.ab + data.d) / data.ab) -
        data.k * (data.t - data.tk);

      $("#bed-" + id)[0].value = data.bed.toFixed(2);
      $("#n-" + id).removeClass("fw-bold");
      $("#d-" + id).removeClass("fw-bold");
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
    $("#bed-" + dataId).removeClass("fw-bold");
    $("#n-" + dataId).removeClass("fw-bold");
    $("#d-" + dataId).removeClass("fw-bold");
  });
});
