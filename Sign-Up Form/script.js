function checkPassword() {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm_password");
    let error_msg = document.getElementById("error_msg");
    if (password.value != confirmPassword.value || password.value == "") {
        password.style.border = "2px solid red";
        confirmPassword.style.border = "2px solid red";
        error_msg.classList.add("error");
        error_msg.innerHTML = "*Passwords do not match";
    }
    else {
        password.style.border = "2px solid green";
        confirmPassword.style.border = "2px solid green";
        error_msg.classList.remove("error");
        error_msg.innerHTML = "";
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inner_form");
    const confirm_password = document.getElementById("confirm_password");
    const password = document.getElementById("password");
    const error_msg = document.getElementById("error_msg");
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone_number");
    const button = document.getElementById("button");

    function checkInputs() {
        if (error_msg.classList.contains("error") || first_name.value == "" || last_name.value == "" || email.value == "" || phone.value == "" || password.value == "" || confirm_password.value == "") {
            button.classList.add("disabled");
        }
        else {
            button.classList.remove("disabled");
        }
    }

    first_name.addEventListener("input", checkInputs);
    last_name.addEventListener("input", checkInputs);
    email.addEventListener("input", checkInputs);
    phone.addEventListener("input", checkInputs);
    password.addEventListener("input", checkInputs);
    confirm_password.addEventListener("input", checkInputs);


    button.addEventListener("click", function (event) {
        event.preventDefault();
        if (button.classList.contains("disabled")) {
            alert("Please fill out all fields correctly");
        }
        else {
            alert("Success!");
        }
    });
});

