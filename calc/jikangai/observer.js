document.addEventListener("DOMContentLoaded", function () {
    const mon_hour = document.getElementById("mon_hour")
    const agreed_hour = document.getElementById("agreed_hour")
    const agreed_minute = document.getElementById("agreed_minute")

    if (mon_hour.value === "1") {
        agreed_hour.disabled = true
        agreed_minute.disabled = true
    }

    mon_hour.addEventListener("change", function () {
        if (this.value === "1") {
            agreed_hour.disabled = true
            agreed_minute.disabled = true
        } else {
            agreed_hour.disabled = false
            agreed_minute.disabled = false
        }
    })
})




const times_inputs = document.querySelectorAll(".times")
times_inputs.forEach(input_form => {
    input_form.addEventListener("blur", () => {
        if (input_form.value === "") {
            input_form.value = "0"
        }
    })
})




window.addEventListener("resize",() => {
    const rate_input_group = document.querySelector(".magnif")
    if (window.innerWidth >= 1440) {
        rate_input_group.classList.add("row-cols-6")
        rate_input_group.classList.remove("row-cols-3")
        rate_input_group.classList.remove("row-cols-2")
    } else if (768 <= window.innerWidth && window.innerWidth < 1440) {
        rate_input_group.classList.remove("row-cols-6")
        rate_input_group.classList.add("row-cols-3")
        rate_input_group.classList.remove("row-cols-2")
    } else {
        rate_input_group.classList.remove("row-cols-6")
        rate_input_group.classList.remove("row-cols-3")
        rate_input_group.classList.add("row-cols-2")
    }
});