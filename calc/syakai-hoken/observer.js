document.querySelector("#old").addEventListener("blur", () => {
    if (document.querySelector("#salary").value === "") {
        document.querySelector("#salary").value = "0"
    }
})

document.querySelector("#old").addEventListener("blur", () => {
    if (document.querySelector("#old").value === "") {
        document.querySelector("#old").value = "0"
    }
})
