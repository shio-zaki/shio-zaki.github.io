document.addEventListener("DOMContentLoaded", function() {
    const mon_hour = document.getElementById("mon_hour")
    const agreed_hour = document.getElementById("agreed_hour")
    const agreed_minute = document.getElementById("agreed_minute")

    if (mon_hour.value === "1") {
        agreed_hour.disabled = true
        agreed_minute.disabled = true
    }

    mon_hour.addEventListener("change", function() {
        if (this.value === "1") {
            agreed_hour.disabled = true
            agreed_minute.disabled = true
        } else {
            agreed_hour.disabled = false
            agreed_minute.disabled = false
        }
    })
})