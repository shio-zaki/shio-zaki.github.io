console.log("aaaaa")


document.querySelector("#calc").addEventListener("click", () => {
    console.log("aaaaaaaaaaaaaaaaaaaaa")
    const salary = document.querySelector("#salary").value
    const year = document.querySelector("#year").value
    const pref = document.querySelector("#pref").value
    const old = document.querySelector("#old").value
    console.log(salary, year, pref, old)


    const j_pref_rate = require("./pref_rate.json")
    console.log(j_pref_rate)
})