[].forEach.call(document.querySelectorAll("[id^='title']"), function (el) {
    let id = el["id"];
    let title = el["id"].split("-")[2];
    let elt = document.getElementById(id);
    elt.value = title;
});

[].forEach.call(document.querySelectorAll("[id^='gender']"), function (el) {
    let id = el["id"];
    let gender = el["id"].split("-")[2];
    let elt = document.getElementById(id);
    elt.value = gender;
});

[].forEach.call(document.querySelectorAll("[id^='country']"), function (el) {
    let id = el["id"];
    let country = el["id"].split("-")[2];
    let elt = document.getElementById(id);
    elt.value = country;
});
