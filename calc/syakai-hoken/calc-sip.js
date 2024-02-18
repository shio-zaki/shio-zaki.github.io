console.log("きゃ～～～～～～～～～～～～")


document.querySelector("#calc").addEventListener("click", () => {
    console.log("押し")
    const salary = document.querySelector("#salary").value
    const year = document.querySelector("#year").value
    const pref = document.querySelector("#pref").value
    const old = document.querySelector("#old").value
    console.log(salary, year, pref, old)

    async function calc() {
        const j_pref_rate = await getJson("./pref_rate.json")
        const j_tier = await getJson("./tier.json")


        // けんぽドキュメント
        const zeroume = year.charAt(0) + String(year.slice(1)).padStart(2, "0")
        const url = `https://www.kyoukaikenpo.or.jp/g7/cat330/sb3150/${zeroume}/${year}ryougakuhyou3gatukara/`

        document.querySelector("#doc_url").innerHTML = `<a href=${url} target="_blank">📄(リンク)</a>`



        // 健康保険料率
        const health_rate = j_pref_rate.find(j => j.pref === pref)[year]
        document.querySelector("#health_rate").innerText = (health_rate * 100).toFixed(3) + " %"

        // 標準報酬月額
        let nomal, tier
        if (salary >= 1355000) {
            nomal = 1390000
            tier = 50
        } else {
            nomal = j_tier.find(d => salary >= d[">="] && salary < d["<"])["nomal"]
            tier = j_tier.find(d => salary >= d[">="] && salary < d["<"])["tier"]
        }
        document.querySelector("#nomal_amount").innerText = nomal + " 円"
        document.querySelector("#nomal_rate").innerText = tier

        // 健康保険料金額
        health_pay = (nomal * health_rate).toFixed(1)
        document.querySelector("#health_pay").innerText = health_pay + " (" + health_pay / 2 + ") 円"




        // 介護保険料
        let nursing_pay, nursing_rate
        if (40 <= old && old <= 64) {
            const j_nur = await getJson("./nur.json")

            // 介護保険料率
            nursing_rate = j_nur.find(d => d.year === year)["add"]

            // 介護保険料金額
            nursing_pay = (nomal * nursing_rate).toFixed(1)
            document.querySelector("#nursing_pay").innerText = nursing_pay + " (" + nursing_pay / 2 + ") 円"
            document.querySelector("#nursing_rate").innerText = (nursing_rate * 100).toFixed(2) + " %"
        } else {
            // 40 <= 年齢 <= 64
            nursing_pay = 0
            nursing_rate = 0
            document.querySelector("#nursing_pay").innerText = "対象外"
            document.querySelector("#nursing_rate").innerText = "対象外"
        }




        // 厚生年金金額
        let pension_pay
        if (salary < 83000) {
            pension_pay = 16104
        } else if (salary > 665000) {
            pension_pay = 118950
        } else {
            pension_pay = (nomal * 0.183).toFixed(2)
        }
        document.querySelector("#pension_pay").innerText = pension_pay + " (" + pension_pay / 2 + ") 円"




        // 小計
        document.querySelector("#subtotal_pay").innerText = (Number(health_pay) + Number(nursing_pay) + Number(pension_pay)).toFixed(1) + ` 円 (健+介 : ${(Number(health_pay) + Number(nursing_pay)).toFixed(1)})`
        const kenpototal = ((Number(health_rate) + Number(nursing_rate)) * 100).toFixed(3)
        document.querySelector("#subtotal_rate").innerText = (18.3 + Number(kenpototal)).toFixed(3) + ` % (健+介 : ${kenpototal} %)`




        // 子ども・子育て拠出金
        const child_rate = 0.0036
        document.querySelector("#child_rate").innerText = (child_rate * 100).toFixed(2) + " %"
        child_pay = (nomal * child_rate).toFixed(1)
        document.querySelector("#child_pay").innerText = child_pay + " 円"




        //合計
        document.querySelector("#total_pay").innerText = Number(health_pay) + Number(nursing_pay) + Number(pension_pay) + Number(child_pay) + " 円"


    }

    async function getJson(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error('error', error);
        }
    }

    calc()
})