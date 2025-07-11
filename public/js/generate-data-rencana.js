document.addEventListener('DOMContentLoaded', async function () {
  const rencanaFisikBtn = document.getElementById('rencanaFisik')
  const rencanaKeuanganBtn = document.getElementById('rencanaKeuangan')

  const waktuKeuangan = document.getElementById('waktuKeuangan')
  const statusKeuangan = document.getElementById('statusKeuangan')

  const waktuFisik = document.getElementById('waktuFisik')
  const statusFisik = document.getElementById('statusFisik')

  // Inisialisasi status keuangan
  changeStatusKeuangan()
  changeStatusFisik()

  rencanaKeuanganBtn.addEventListener('click', async () => {
    rencanaKeuanganBtn.textContent = 'Loading...'
    rencanaKeuanganBtn.disabled = true
    statusKeuangan.textContent = 'Loading...'

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const table = document.querySelectorAll('table#csstab1')
          const secondTable = table[1]
          if (!secondTable) return { error: 'Table not found' }

          const rows = secondTable.querySelectorAll('tbody tr')
          const result = []

          const parseNumber = (str) => {
            const cleaned = str.replace(/\./g, '').replace(',', '.')
            return isNaN(parseFloat(cleaned)) ? 0 : parseFloat(cleaned)
          }

          rows.forEach((row) => {
            const bgColor = row.getAttribute('bgcolor')?.toUpperCase() || null
            if (bgColor == null) {
              const tds = row.querySelectorAll('td')
              const kode = tds[1]?.innerText.trim() || null
              if (!kode) return
              const nama = tds[2]?.innerText.trim() || null
              const pagu = tds[3]?.innerText.trim() || null
              const bulan = Array.from({ length: 12 }, (_, i) => {
                const value = tds[4 + i]?.innerText.trim() || '0'
                return parseNumber(value)
              })

              result.push({
                kode,
                nama,
                pagu: parseNumber(pagu),
                bulan: bulan,
              })
            }
          })

          const waktu = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })

          return {
            result,
            waktu,
          }
        },
      },
      (results) => {
        if (chrome.runtime.lastError || !results || results[0].result?.error) {
          console.error(
            chrome.runtime.lastError?.message || results[0].result?.error || 'Unknown error',
          )
          statusKeuangan.textContent = 'Gagal diambil'
          rencanaKeuanganBtn.textContent = 'Ambil'
          rencanaKeuanganBtn.disabled = false
          return
        }

        const data = results[0].result
        waktuKeuangan.textContent = `${data.waktu}`
        statusKeuangan.textContent = 'Terisi'
        rencanaKeuanganBtn.textContent = 'Ambil'
        rencanaKeuanganBtn.disabled = false
        chrome.storage.local.set({ rencanaKeuangan: data })
      },
    )
  })

  rencanaFisikBtn.addEventListener('click', async () => {
    rencanaFisikBtn.textContent = 'Loading...'
    rencanaFisikBtn.disabled = true
    statusFisik.textContent = 'Loading...'

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const table = document.querySelector('table#csstab1')
          if (!table) return { error: 'Table not found' }

          const rows = table.querySelectorAll('tbody tr')
          const result = []

          const parseNumber = (str) => {
            const cleaned = str.replace(/\./g, '').replace(',', '.')
            return isNaN(parseFloat(cleaned)) ? 0 : parseFloat(cleaned)
          }

          rows.forEach((row) => {
            const bgColor = row.getAttribute('bgcolor')?.toUpperCase() || null
            if (bgColor == null) {
              const tds = row.querySelectorAll('td')
              const kode = tds[1]?.innerText.trim() || null
              if (!kode) return
              const nama = tds[2]?.innerText.trim() || null
              const pagu = tds[3]?.innerText.trim() || null
              const bulan = Array.from({ length: 12 }, (_, i) => {
                const value = tds[4 + i]?.innerText.trim() || '0'
                return parseNumber(value)
              })
              result.push({
                kode,
                nama,
                pagu: parseNumber(pagu),
                bulan: bulan,
              })
            }
          })

          const waktu = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })

          return {
            result,
            waktu,
          }
        },
      },
      (results) => {
        if (chrome.runtime.lastError || !results || results[0].result?.error) {
          console.error(
            chrome.runtime.lastError?.message || results[0].result?.error || 'Unknown error',
          )
          statusFisik.textContent = 'Gagal diambil'
          rencanaFisikBtn.textContent = 'Ambil'
          rencanaFisikBtn.disabled = false
          return
        }

        const data = results[0].result
        waktuFisik.textContent = `${data.waktu}`
        statusFisik.textContent = 'Terisi'
        rencanaFisikBtn.textContent = 'Ambil'
        rencanaFisikBtn.disabled = false
        chrome.storage.local.set({ rencanaFisik: data })
      },
    )
  })
})

const changeStatusKeuangan = () => {
  const waktuKeuangan = document.getElementById('waktuKeuangan')
  const statusKeuangan = document.getElementById('statusKeuangan')

  chrome.storage.local.get(['rencanaKeuangan'], (result) => {
    if (result.rencanaKeuangan) {
      const data = result.rencanaKeuangan
      waktuKeuangan.textContent = `${data.waktu}`
      statusKeuangan.textContent = 'Terisi'
    } else {
      waktuKeuangan.textContent = '-'
      statusKeuangan.textContent = 'Belum Diambil'
    }
  })
}

const changeStatusFisik = () => {
  const waktuFisik = document.getElementById('waktuFisik')
  const statusFisik = document.getElementById('statusFisik')

  chrome.storage.local.get(['rencanaFisik'], (result) => {
    if (result.rencanaFisik) {
      const data = result.rencanaFisik
      waktuFisik.textContent = `${data.waktu}`
      statusFisik.textContent = 'Terisi'
    } else {
      waktuFisik.textContent = '-'
      statusFisik.textContent = 'Belum Diambil'
    }
  })
}
