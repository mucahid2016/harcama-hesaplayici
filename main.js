const fiyatInp = document.getElementById("fiyat")
const harcamaInp = document.getElementById("harcama")
const eklemeBtn = document.getElementById("eklemeBtn")
const liste = document.querySelector(".liste")
const odendiMi = document.getElementById("odeme")
const toplamSpan = document.getElementById('toplam')



eklemeBtn.addEventListener("click", addExpense)

liste.addEventListener("click", handleClick)


let expenses = []

function updateToplam() {
    var toplam = expenses.reduce((toplam, fiyat) => toplam + fiyat, 0)
    toplamSpan.innerText = toplam;
}

function addExpense(event) {
    event.preventDefault();

    if (!fiyatInp.value && !harcamaInp.value) {
        alert("Boş Alanlari Doldurrr")
        return
    }

    const itemBox = document.createElement("div")
    itemBox.classList.add("item")

    if (odendiMi.checked) {
        itemBox.classList.add("odendi")
    }

    itemBox.innerHTML = `
    <h1>
        ${harcamaInp.value}
    </h1>
    <h2>
        ${fiyatInp.value} &#8378;
    </h2>

    <div class="buttons">
        <img id="edit" src="img/pay.png" alt="">
        <img id="delete" src="img/remove.png" alt="">
    </div>
    `
    liste.appendChild(itemBox)

    if (!odendiMi.checked) {
        expenses.push(Number(fiyatInp.value))
    }


    updateToplam()

    fiyatInp.value = ''
    harcamaInp.value = ''
}

function handleClick(e) {
    const element = e.target


    if (e.target.id == "delete") {
        const harcama = element.parentElement.parentElement

        harcama.remove()

        const cikarilacak = harcama.querySelector('h2').innerText;

        expenses.push(-Number(cikarilacak))
        updateToplam()
    }
}