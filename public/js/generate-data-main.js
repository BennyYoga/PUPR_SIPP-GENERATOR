document.addEventListener('DOMContentLoaded', async function () {
  const longSegmentData = await fetch('../longSegment.json').then((res) => res.json())

  const SIPPBtn = document.getElementById('SIPP')
  const waktuSIPP = document.getElementById('waktuSIPP')
  const statusSIPP = document.getElementById('statusSIPP')

  const SatkerBtn = document.getElementById('satker')
  const waktuSatker = document.getElementById('waktuSatker')
  const statusSatker = document.getElementById('statusSatker')

  // Add click event listener for the Excel button
  changeStatusSIPP()
  changeStatusEmon()

  SatkerBtn.addEventListener('click', async function () {
    SatkerBtn.textContent = 'Loading...'
    SatkerBtn.disabled = true
    statusSatker.textContent = 'Loading...'

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: async () => {
          const table = document.querySelector('table#csstab1')
          if (!table) return { error: 'Table not found' }

          const findRencanaFisikBulanIni = async (kode) => {
            return new Promise((resolve, reject) => {
              chrome.storage.local.get(['rencanaFisik'], (result) => {
                if (result.rencanaFisik) {
                  let dataAktif = result.rencanaFisik.result.find((item) => item.kode === kode)
                  let hasil = null
                  if (dataAktif) {
                    let bulanSekarang = new Date().getMonth()
                    let tanggalSekarang = new Date().getDate()

                    if (bulanSekarang < 2) {
                      console.log('Data untuk bulan sebelumnya tidak tersedia.')
                    } else {
                      let dataBulanSekarang = dataAktif.bulan[bulanSekarang]
                      let dataBulanKemarin = dataAktif.bulan[bulanSekarang - 1]

                      let tahunSekarang = new Date().getFullYear()
                      let jumlahHariBulanIni = new Date(
                        tahunSekarang,
                        bulanSekarang + 1,
                        0,
                      ).getDate()

                      hasil =
                        ((dataBulanSekarang - dataBulanKemarin) / jumlahHariBulanIni) *
                          tanggalSekarang +
                        dataBulanKemarin
                      resolve(hasil.toFixed(2))
                    }
                    // resolve(hasil)
                  } else {
                    reject('Data tidak ditemukan')
                  }
                } else {
                  reject('Data tidak ditemukan')
                }
              })
            })
          }

          function parseToFloat(str) {
            if (!str || typeof str !== 'string') return 0

            str = str.trim().replace(/[^\d.,-]/g, '')
            if (str.includes('.') && str.includes(',')) {
              str = str.replace(/\./g, '').replace(',', '.')
            } else if (str.includes(',')) {
              str = str.replace(',', '.')
            }

            const num = parseFloat(str)
            return isNaN(num) ? 0 : num
          }

          const findRencanaKeuanganBulanIni = async (kode) => {
            return new Promise((resolve, reject) => {
              chrome.storage.local.get(['rencanaKeuangan'], (result) => {
                if (result.rencanaKeuangan) {
                  let dataAktif = result.rencanaKeuangan.result.find((item) => item.kode === kode)
                  let hasil = null
                  if (dataAktif) {
                    let bulanSekarang = new Date().getMonth()
                    let tanggalSekarang = new Date().getDate()

                    if (bulanSekarang < 2) {
                      console.log('Data untuk bulan sebelumnya tidak tersedia.')
                    } else {
                      let dataBulanSekarang = dataAktif.bulan[bulanSekarang]
                      let dataBulanKemarin = dataAktif.bulan[bulanSekarang - 1]

                      let tahunSekarang = new Date().getFullYear()
                      let jumlahHariBulanIni = new Date(
                        tahunSekarang,
                        bulanSekarang + 1,
                        0,
                      ).getDate()

                      // hasil =
                      //   ((dataBulanKemarin - dataBulanSekarang) / jumlahHariBulanIni) *
                      //     tanggalSekarang +
                      //   dataBulanSekarang
                      hasil =
                        ((dataBulanSekarang - dataBulanKemarin) / jumlahHariBulanIni) *
                          tanggalSekarang +
                        dataBulanKemarin
                      resolve(hasil.toFixed(2))
                    }
                  } else {
                    reject('Data tidak ditemukan')
                  }
                } else {
                  reject('Data tidak ditemukan')
                }
              })
            })
          }

          const rows = table.querySelectorAll('tbody tr')
          const resultSatker = []
          const resultA = []
          const resultB = []
          const resultC = []
          const resultD = []

          const resultSimpenan = async () => {
            return new Promise((resolve) => {
              chrome.storage.local.get(['dataSimpenan'], (result) => {
                if (result.dataSimpenan) {
                  resolve(result.dataSimpenan)
                } else {
                  resolve([])
                }
              })
            })
          }

          const dataResultSimpenan = await resultSimpenan()

          const getText = (el) => el?.innerText?.trim().replace(/\s+/g, ' ') || ''
          const getNumber = (el) => {
            if (!el?.innerText) return 0
            // Ambil teks, hapus spasi & titik, lalu ubah ke number
            const text = el.innerText.trim().replace(/\./g, '').replace(/\s+/g, '')
            const num = Number(text)
            return isNaN(num) ? 0 : num
          }

          for (const row of rows) {
            let itemDitemukan = null
            const bgColor = row.getAttribute('bgColor') || ''
            const cells = row.querySelectorAll('td')
            const jenis = getText(cells[7])

            //Pengaturan Jika Namanya ada di dataResultSimpenan maka dikalkulasi Pagunya
            const nama = getText(cells[2])
            const pagu = getNumber(cells[9])
            const blokir = getNumber(cells[11])
            const kode = getText(cells[1])

            function hapusTandaKurung(nama) {
              return nama
                .replace(/\(\s*(.*?)\s*\)/g, '$1')
                .replace(/\s+/g, ' ')
                .trim()
            }
            itemDitemukan = dataResultSimpenan.find(
              (item) => hapusTandaKurung(item.nama) === hapusTandaKurung(nama),
            )

            if (itemDitemukan) {
              let hasilKalkulasi = pagu - blokir
              itemDitemukan.hasil_effisiensi =
                (itemDitemukan.hasil_effisiensi == null ? 0 : itemDitemukan.hasil_effisiensi) +
                hasilKalkulasi
              itemDitemukan.pagu += pagu
            }

            if (
              (jenis === 'Swakelola' || jenis === 'AU') &&
              (bgColor === '' || bgColor === '#FFFFFF')
            ) {
              const vol = getText(cells[3])
              const satuan = getText(cells[4])
              const realisasi_fisik = parseToFloat(getText(cells[14]))
              const realisasi_keuangan = parseToFloat(getText(cells[13]))
              const rencana_fisik = parseToFloat(await findRencanaFisikBulanIni(kode))
              const rencana_keuangan = parseToFloat(await findRencanaKeuanganBulanIni(kode))
              const deviasi_fisik = parseToFloat(rencana_fisik - realisasi_fisik)
              const deviasi_keuangan = parseToFloat(rencana_keuangan - realisasi_keuangan)
              const kodeParts = kode.split('.')
              const keterangan = `(IEmon : ${new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })})`

              if (kodeParts.length === 5) {
                const firstDigit = kodeParts[4].charAt(0)
                const secondDigit = kodeParts[4].charAt(1) ?? null
                let resultArray = null
                resultArray =
                  firstDigit === 'A'
                    ? resultA
                    : firstDigit === 'B'
                      ? resultB
                      : firstDigit === 'C'
                        ? resultC
                        : firstDigit === 'D'
                          ? resultD
                          : kodeParts[4] === 'E'
                            ? resultB
                            : null

                if (firstDigit === 'H' && secondDigit) {
                  if (secondDigit == 'A') {
                    resultArray = resultA
                  }
                  if (secondDigit == 'B' || secondDigit == 'H') {
                    resultArray = resultB
                  }
                  if (secondDigit == 'C' || secondDigit == 'I') {
                    resultArray = resultC
                  }
                  if (secondDigit == 'D' || secondDigit == 'J') {
                    resultArray = resultD
                  }
                  if (
                    secondDigit == 'E' ||
                    secondDigit == 'F' ||
                    secondDigit == 'K' ||
                    secondDigit == 'L'
                  ) {
                    resultArray = resultSatker
                  }
                  if (secondDigit == 'G') {
                    if (kodeParts[3] == '402') {
                      resultArray = resultA
                    } else if (kodeParts[3] == '401') {
                      resultArray = resultSatker
                    }
                  }
                }

                if (firstDigit === 'E' && secondDigit) {
                  if (secondDigit === 'A') {
                    resultArray = resultA
                  } else if (secondDigit === 'B') {
                    resultArray = resultB
                  } else if (secondDigit === 'C') {
                    resultArray = resultC
                  } else if (secondDigit === 'D') {
                    resultArray = resultD
                  } else if (
                    secondDigit === 'I' ||
                    secondDigit === 'F' ||
                    secondDigit === 'G' ||
                    secondDigit === 'H'
                  ) {
                    resultArray = resultSatker
                  }
                }

                if (firstDigit == 'F' && secondDigit) {
                  if (secondDigit == 'A') resultArray = resultA
                  if (secondDigit == 'B') resultArray = resultB
                  if (secondDigit == 'C') resultArray = resultC
                  if (secondDigit == 'D') resultArray = resultD
                  if (secondDigit == 'E' || secondDigit == 'F') resultArray = resultSatker
                }
                hasil_effisiensi = pagu - (blokir || 0)
                if (resultArray) {
                  resultArray.push({
                    kode,
                    nama,
                    vol,
                    pagu,
                    hasil_effisiensi,
                    satuan,
                    rencana_keuangan,
                    realisasi_keuangan,
                    rencana_fisik,
                    realisasi_fisik,
                    deviasi_keuangan,
                    deviasi_fisik,
                    keterangan,
                  })
                }
              }
            }
          }
          chrome.storage.local.set({ dataSimpenan: dataResultSimpenan })
          const result = { resultSatker, resultA, resultB, resultC, resultD }
          const waktu = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })

          return {
            waktu: waktu,
            result: result,
            resultSimpenan: dataResultSimpenan,
          }
        },
      },
      (response) => {
        if (chrome.runtime.lastError || !response || response[0].result?.error) {
          console.error(
            chrome.runtime.lastError?.message || response[0].result?.error || 'Unknown error',
          )
          statusSIPP.textContent = 'Gagal diambil'
          SIPPBtn.textContent = 'Ambil'
          SIPPBtn.disabled = false
          return
        }

        const result = response[0].result
        waktuSatker.textContent = `${result.waktu}`
        statusSatker.textContent = 'Terisi'
        SatkerBtn.textContent = 'Ambil'
        SatkerBtn.disabled = false

        chrome.storage.local.set({ dataEmon: result })
      },
    )
  })

  // SIPP GENERATE ===============================================================================================
  SIPPBtn.addEventListener('click', async function () {
    SIPPBtn.textContent = 'Loading...'
    SIPPBtn.disabled = true
    statusSIPP.textContent = 'Loading...'

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: (longSegmentData) => {
          const table = document.querySelector('table#table_paket_kontraktual_gabungan')
          if (!table) {
            alert('Table not found on the page.')
            return
          }
          const rows = table.querySelectorAll('tr')
          const resultA = []
          const resultB = []
          const resultC = []
          const resultD = []
          const resultSimpenan = []

          const toFloatWithTwoDecimals = (str) => {
            if (str == ' ' || str == '') return str
            const parsed = parseFloat(str.replace(',', '.')) // Convert to float, replace comma if any
            return isNaN(parsed) ? '' : parsed.toFixed(2) // Ensure 2 decimal places
          }

          rows.forEach((row) => {
            const bgColor = row.getAttribute('bgcolor')?.toUpperCase() || ''
            const getText = (index) => row.querySelectorAll('td')[index]?.innerText.trim() || ''
            const getNumber = (el) => {
              if (!el?.innerText) return 0
              const text = el.innerText.trim().replace(/\./g, '').replace(/\s+/g, '')
              const num = Number(text)
              return isNaN(num) ? 0 : num
            }

            if (bgColor == '#FFFFF' || bgColor == '') {
              const kode = getText(5)
              const nama = getText(6)
              const vol = getText(8)
              const satuan = getText(9)
              const rencana_keuangan = toFloatWithTwoDecimals(getText(23))
              const realisasi_keuangan = toFloatWithTwoDecimals(getText(24))
              const deviasi_keuangan = toFloatWithTwoDecimals(getText(26))
              const rencana_fisik = toFloatWithTwoDecimals(getText(27))
              const realisasi_fisik = toFloatWithTwoDecimals(getText(28))
              const deviasi_fisik = toFloatWithTwoDecimals(getText(39))
              const keterangan = `${getText(44)} (SIPP : ${new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })})`

              const kodeParts = kode.split('.')

              if (kodeParts.length == 8) {
                const firstDigit = kodeParts[7][0]

                const resultArray =
                  firstDigit === 'A'
                    ? resultA
                    : firstDigit === 'B'
                      ? resultB
                      : firstDigit === 'C'
                        ? resultC
                        : firstDigit === 'D'
                          ? resultD
                          : kodeParts[7] == 'E'
                            ? resultB // Assuming 'E' is also part of A
                            : null

                if (resultArray) {
                  resultSimpenan.push({
                    nama: nama,
                    kode: kode,
                    pagu: null,
                    hasil_effisiensi: null,
                    kode_result: firstDigit == 'E' ? 'B' : firstDigit,
                  })
                  resultArray.push({
                    kode: kode,
                    nama: nama,
                    vol: vol,
                    satuan: satuan,
                    pagu: null,
                    hasil_effisiensi: null,
                    rencana_keuangan: parseFloat(rencana_keuangan),
                    realisasi_keuangan: parseFloat(realisasi_keuangan),
                    deviasi_keuangan: parseFloat(deviasi_keuangan),
                    rencana_fisik: parseFloat(rencana_fisik),
                    realisasi_fisik: parseFloat(realisasi_fisik),
                    deviasi_fisik: parseFloat(deviasi_fisik),
                    keterangan: keterangan,
                  })
                }
              } else if (kodeParts.length == 5 && longSegmentData[kodeParts[4]]) {
                const wilayah = longSegmentData[kodeParts[4]].wilayah
                const resultArrat =
                  wilayah === 'A'
                    ? resultA
                    : wilayah === 'B'
                      ? resultB
                      : wilayah === 'C'
                        ? resultC
                        : wilayah === 'D'
                          ? resultD
                          : null

                if (resultArrat) {
                  //Menyimpan Result
                  resultSimpenan.push({
                    nama: nama,
                    kode: kode,
                    pagu: null,
                    hasil_effisiensi: null,
                    kode_result: wilayah,
                  })
                  hasil_effisiensi = null
                  pagu = null
                  resultArrat.push({
                    kode,
                    nama,
                    pagu,
                    hasil_effisiensi,
                    satuan,
                    rencana_keuangan,
                    realisasi_keuangan,
                    deviasi_keuangan,
                    rencana_fisik,
                    realisasi_fisik,
                    deviasi_fisik,
                    keterangan,
                  })
                }
              }
            }
          })
          chrome.storage.local.set({ dataSimpenan: resultSimpenan })
          const result = { resultA, resultB, resultC, resultD }
          const waktu = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
          return {
            waktu: waktu,
            result: result,
          }
        },
        args: [longSegmentData],
      },
      (response) => {
        if (chrome.runtime.lastError || !response || response[0].result?.error) {
          console.error(
            chrome.runtime.lastError?.message || response[0].result?.error || 'Unknown error',
          )
          statusSIPP.textContent = 'Gagal diambil'
          SIPPBtn.textContent = 'Ambil'
          SIPPBtn.disabled = false
          return
        }

        const result = response[0].result
        waktuSIPP.textContent = `${result.waktu}`
        statusSIPP.textContent = 'Terisi'
        SIPPBtn.textContent = 'Ambil'
        SIPPBtn.disabled = false

        chrome.storage.local.set({ dataSIPP: result })
      },
    )
  })
})

const changeStatusSIPP = () => {
  const waktuSIPP = document.getElementById('waktuSIPP')
  const statusSIPP = document.getElementById('statusSIPP')

  chrome.storage.local.get(['dataSIPP'], (result) => {
    if (result.dataSIPP) {
      // Perbaiki pemeriksaan ini
      const data = result.dataSIPP
      waktuSIPP.textContent = `${data.waktu}`
      statusSIPP.textContent = 'Terisi'
    } else {
      waktuSIPP.textContent = '-'
      statusSIPP.textContent = 'Belum Diambil'
    }
  })
}

const changeStatusEmon = () => {
  const waktuSatker = document.getElementById('waktuSatker')
  const statusSatker = document.getElementById('statusSatker')

  chrome.storage.local.get(['dataEmon'], (result) => {
    if (result.dataEmon) {
      // Perbaiki pemeriksaan ini
      const data = result.dataEmon
      waktuSatker.textContent = `${data.waktu}`
      statusSatker.textContent = 'Terisi'
    } else {
      waktuSatker.textContent = '-'
      statusSatker.textContent = 'Belum Diambil'
    }
  })
}
