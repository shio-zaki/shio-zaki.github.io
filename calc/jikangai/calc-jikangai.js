console.log("きゃ～～～～～～～～～～～～")

const Decimal = window.Decimal


document.querySelector("#calc").addEventListener("click", () => {
    console.log("押し")
    const salary = document.querySelector("#salary").value
    let ishourly = document.querySelector("#mon_hour").value
    if (ishourly == 0) {
        ishourly = false
    } else {
        ishourly = true
    }

    // 分給・時給
    let wage_minute
    if (ishourly) {
        document.querySelector("#wage_hour").innerText = salary + " 円/時間"
        wage_minute = new Decimal(salary).div(60).toNumber()
        document.querySelector("#wage_minute").innerText = wage_minute + " 円/分"
    } else {
        const agreed_hour = document.querySelector("#agreed_hour").value
        const agreed_minute = document.querySelector("#agreed_minute").value
        const all_agreed_minute = (agreed_hour * 60) + agreed_minute
        wage_minute = new Decimal(salary)
        wage_minute = wage_minute.div(all_agreed_minute).toNumber()
        document.querySelector("#wage_hour").innerText = (new Decimal(wage_minute).times(60).toNumber()).toFixed(2) + " 円/時間"
        document.querySelector("#wage_minute").innerText = wage_minute + " 円/分"
    }

    // 法定外労働時間(分)
    const excess_hour = document.querySelector("#excess_hour").value
    const excess_minute = document.querySelector("#excess_minute").value
    const all_excess = (new Decimal(excess_hour).times(60)).add(excess_minute).toNumber()

    // 法定外労働手当
    const excess_rate = document.querySelector("#excess_rate_in").value
    let excess_pay
    if (all_excess <= 3600) {
        excess_pay = new Decimal(all_excess).times(excess_rate).times(wage_minute).toNumber()
    } else {
        const excess_rate_over = document.querySelector("#excess_rate_over_in").value
        const out60minute = all_excess - 3600
        const out60amount = new Decimal(out60minute).times(excess_rate_over).times(wage_minute).toNumber()
        const in60amount = new Decimal(excess_rate).times(wage_minute).times(3600).toNumber()
        excess_pay = new Decimal(out60amount).add(in60amount).toNumber()
    }
    document.querySelector("#excess_pay").innerText = excess_pay.toFixed(1) + " 円"

    // 法定外労働(深夜)時間(分)
    const late_hour = document.querySelector("#late_hour").value
    const late_minute = document.querySelector("#late_minute").value
    const all_late = (new Decimal(late_hour).times(60)).add(late_minute).toNumber()

    // 法定外労働手当(深夜)
    const late_rate = document.querySelector("#late_rate_in").value
    let late_pay
    if (all_late <= 3600) {
        late_pay = new Decimal(all_late).times(late_rate).times(wage_minute).toNumber()
    } else {
        const late_rate_over_in = document.querySelector("#late_rate_over_in").value
        const out60minute_ = all_late - 3600
        console.log(out60minute_, "aaaaaaaaaa")
        const out60amount_ = new Decimal(out60minute_).times(late_rate_over_in).times(wage_minute).toNumber()
        const in60amount_ = new Decimal(late_rate).times(wage_minute).times(3600).toNumber()
        late_pay = new Decimal(out60amount_).add(in60amount_).toNumber()
    }
    document.querySelector("#late_pay").innerText = late_pay.toFixed(1) + " 円"

    // 法定休日労働時間 (分)
    const holiday_hour = document.querySelector("#holiday_hour").value
    const holiday_minute = document.querySelector("#holiday_minute").value
    const all_holiday = (new Decimal(holiday_hour).times(60)).add(holiday_minute).toNumber()

    // 法定休日労働手当
    const holiday_rate = document.querySelector("#holiday_rate_in").value
    const holiday_pay = new Decimal(all_holiday).times(holiday_rate).times(wage_minute).toNumber()
    document.querySelector("#holiday_pay").innerText = holiday_pay.toFixed(1) + " 円"

    // 法定休日労働(深夜)時間 (分)
    const holiday_late_hour = document.querySelector("#holiday_late_hour").value
    const holiday_late_minute = document.querySelector("#holiday_late_minute").value
    const all_holiday_late = (new Decimal(holiday_late_hour).times(60)).add(holiday_late_minute).toNumber()

    // 法定休日労働手当
    const holiday_late_rate = document.querySelector("#holiday_late_rate_in").value
    const holiday_late_pay = new Decimal(all_holiday_late).times(holiday_late_rate).times(wage_minute).toNumber()
    document.querySelector("#holiday_late_pay").innerText = holiday_late_pay.toFixed(1) + " 円"

    // 合計
    const total = new Decimal(excess_pay).add(late_pay).add(holiday_pay).add(holiday_late_pay).toNumber() + " 円"
    document.querySelector("#total_pay").innerText = total
})