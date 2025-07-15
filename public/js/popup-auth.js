const authForm = document.getElementById('authForm')
const notLoggedInDiv = document.querySelector('.notLoggedIn')
const loggedInDiv = document.querySelector('.loggedIn')
const errorMessage = document.querySelector('.error-message')

// Fungsi tampilkan status login dari chrome.storage
function checkLoginStatus() {
  chrome.storage.local.get(['LoggedIn'], (result) => {
    if (result.LoggedIn === true) {
      notLoggedInDiv.style.display = 'none'
      loggedInDiv.style.display = 'block'
    } else {
      notLoggedInDiv.style.display = 'block'
      loggedInDiv.style.display = 'none'
    }
  })
}

// Cek status login saat halaman load
document.addEventListener('DOMContentLoaded', checkLoginStatus)

authForm.addEventListener('submit', async function (e) {
  e.preventDefault()
  const kode = document.getElementById('authCode').value.trim()

  // Reset pesan error dan sembunyikan alert danger
  errorMessage.textContent = ''
  errorMessage.parentElement.style.display = 'none'

  if (kode === '') {
    errorMessage.textContent = 'Kode harus diisi.'
    errorMessage.parentElement.style.display = 'block'
    return
  }
  const isValid = await encriptionChecked(kode)
  if (isValid) {
    chrome.storage.local.set({ LoggedIn: true }, () => {
      notLoggedInDiv.style.display = 'none'
      loggedInDiv.style.display = 'block'
      errorMessage.parentElement.style.display = 'none'

      alert("Berhasil")  // <-- Alert muncul saat login berhasil
    })
  } else {
    errorMessage.textContent = `Kode Tidak Sesuai, Hubungi Teknisi!!`
    errorMessage.parentElement.style.display = 'block'
  }
})

const str2ab = (str) => new TextEncoder().encode(str)
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', str2ab(str))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const encriptionChecked = async (str, now = new Date()) => {
  const parts = str.trim().split('g')
  if (parts.length !== 3) return false

  const hashedKode = parts[1]

  for (let i = 0; i <= 60; i++) {
    const testDate = new Date(now.getTime() - i * 60 * 1000)
    testDate.setSeconds(0)
    testDate.setMilliseconds(0)

    const localDateString = testDate.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    const hashedTestDate = await sha256(localDateString)

    if (hashedTestDate === hashedKode) {
      return true
    }
  }
  return false
}
