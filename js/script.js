$(document).ready(() => {
  console.log("object");

  let data = {
    bed: "",
    n: "",
    k: "",
    d: "",
    t: "",
    ab: "",
    tk: "",
  };

  function checkEmptyInput() {
    let empInput = [];

    for (const [key, value] of Object.entries(data)) {
      if (isNaN(value)) {
        empInput.push(key);
      }
    }

    console.log(empInput);
    return empInput;
  }

  function checkVal() {
    let bed1 = $("#bed-1")[0].value;
    console.log("🚀 ~ $ ~ bed1:", bed1);
    let n1 = $("#n-1")[0].value;
    console.log("🚀 ~ $ ~ n1:", n1);
    let k1 = $("#k-1")[0].value;
    console.log("🚀 ~ $ ~ k1:", k1);
    let d1 = $("#d-1")[0].value;
    console.log("🚀 ~ $ ~ d1:", d1);
    let t1 = $("#t-1")[0].value;
    console.log("🚀 ~ $ ~ t1:", t1);
    let ab1 = $("#ab-1")[0].value;
    console.log("🚀 ~ $ ~ ab1:", ab1);
    let tk1 = $("#tk-1")[0].value;
    console.log("🚀 ~ $ ~ tk1:", tk1);
  }

  function calcBED1() {
    let bed1 = $("#bed-1")[0].value;
    let n1 = $("#n-1")[0].value;
    let k1 = $("#k-1")[0].value;
    let d1 = $("#d-1")[0].value;
    let t1 = $("#t-1")[0].value;
    let ab1 = $("#ab-1")[0].value;
    let tk1 = $("#tk-1")[0].value;

    data = {
      bed: parseFloat(bed1),
      n: parseFloat(n1),
      k: parseFloat(k1),
      d: parseFloat(d1),
      t: parseFloat(t1),
      ab: parseFloat(ab1),
      tk: parseFloat(tk1),
    };

    checkEmptyInput();

    if (isNaN(data.n)) {
      data.n =
        ((data.bed + data.k * (data.t - data.tk)) / data.d) *
        (data.ab / (data.ab + data.d));

      $("#n-1")[0].value = data.n;
      $("#bed-1").removeClass("fw-bold");
      $("#n-1").addClass("fw-bold");
    } else {
      data.bed =
        data.n * data.d * ((data.ab + data.d) / data.ab) -
        data.k * (data.t - data.tk);

      $("#bed-1")[0].value = data.bed;
      $("#bed-1").addClass("fw-bold");
    }

    console.log(data);
  }

  $("#calc-1").click((e) => {
    e.preventDefault();

    checkVal();
    calcBED1();
  });
});
