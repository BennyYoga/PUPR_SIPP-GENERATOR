document.addEventListener('DOMContentLoaded', async function () {
  const generatedBtn = document.getElementById('excelPage')

  generatedBtn.addEventListener('click', async function () {
    const dataSIPP = await getFromStorage('dataSIPP')
    const dataEmon = await getFromStorage('dataEmon')

    const ambilDataSimpenan = async () => {
      return new Promise((resolve) => {
        chrome.storage.local.get(['dataSimpenan'], (result) => {
          resolve(result.dataSimpenan)
        })
      })
    }
    const dataSimpenan = await ambilDataSimpenan()
    dataSimpenan.forEach((item) => {
      if (item.kode_result == 'A') {
        let itemDitemukan = dataSIPP.resultA.find((data) => data.kode == item.kode)
        if (itemDitemukan) {
          itemDitemukan.hasil_effisiensi =
            (itemDitemukan.hasil_effisiensi || 0) + (item.hasil_effisiensi || 0)
          itemDitemukan.pagu = item.pagu
          if (item.array_pagu.length >= 1) {
            let hasilSimpenanKalkulasiRencanaFisik = 0
            let hasilSimpenanKalkulasiRealisasiFisik = 0
            let hasilSimpenanKalkulasiRencanaKeuangan = 0
            let hasilSimpenanKalkulasiRealisasiKeuangan = 0
            for (let i = 0; i < item.array_pagu.length; i++) {
              hasilSimpenanKalkulasiRencanaFisik +=
                (item.array_pagu[i] * item.array_rencana_fisik[i]) / 100
              hasilSimpenanKalkulasiRealisasiFisik +=
                (item.array_pagu[i] * item.array_realisasi_fisik[i]) / 100
              hasilSimpenanKalkulasiRencanaKeuangan +=
                (item.array_pagu[i] * item.array_rencana_keuangan[i]) / 100
              hasilSimpenanKalkulasiRealisasiKeuangan +=
                (item.array_pagu[i] * item.array_realisasi_keuangan[i]) / 100
            }
            itemDitemukan.rencana_fisik = (hasilSimpenanKalkulasiRencanaFisik / item.pagu) * 100
            itemDitemukan.realisasi_fisik = (hasilSimpenanKalkulasiRealisasiFisik / item.pagu) * 100
            itemDitemukan.rencana_keuangan =
              (hasilSimpenanKalkulasiRencanaKeuangan / item.pagu) * 100
            itemDitemukan.realisasi_keuangan =
              (hasilSimpenanKalkulasiRealisasiKeuangan / item.pagu) * 100
          }
        }
      }
      if (item.kode_result == 'B') {
        let itemDitemukan = dataSIPP.resultB.find((data) => data.kode == item.kode)
        if (itemDitemukan) {
          itemDitemukan.hasil_effisiensi =
            (itemDitemukan.hasil_effisiensi || 0) + (item.hasil_effisiensi || 0)
          itemDitemukan.pagu = item.pagu
          if (item.array_pagu.length >= 1) {
            let hasilSimpenanKalkulasiRencanaFisik = 0
            let hasilSimpenanKalkulasiRealisasiFisik = 0
            let hasilSimpenanKalkulasiRencanaKeuangan = 0
            let hasilSimpenanKalkulasiRealisasiKeuangan = 0
            for (let i = 0; i < item.array_pagu.length; i++) {
              hasilSimpenanKalkulasiRencanaFisik +=
                (item.array_pagu[i] * item.array_rencana_fisik[i]) / 100
              hasilSimpenanKalkulasiRealisasiFisik +=
                (item.array_pagu[i] * item.array_realisasi_fisik[i]) / 100
              hasilSimpenanKalkulasiRencanaKeuangan +=
                (item.array_pagu[i] * item.array_rencana_keuangan[i]) / 100
              hasilSimpenanKalkulasiRealisasiKeuangan +=
                (item.array_pagu[i] * item.array_realisasi_keuangan[i]) / 100
            }
            itemDitemukan.rencana_fisik = (hasilSimpenanKalkulasiRencanaFisik / item.pagu) * 100
            itemDitemukan.realisasi_fisik = (hasilSimpenanKalkulasiRealisasiFisik / item.pagu) * 100
            itemDitemukan.rencana_keuangan =
              (hasilSimpenanKalkulasiRencanaKeuangan / item.pagu) * 100
            itemDitemukan.realisasi_keuangan =
              (hasilSimpenanKalkulasiRealisasiKeuangan / item.pagu) * 100
          }
        }
      }
      if (item.kode_result == 'C') {
        let itemDitemukan = dataSIPP.resultC.find((data) => data.kode == item.kode)
        if (itemDitemukan) {
          itemDitemukan.hasil_effisiensi =
            (itemDitemukan.hasil_effisiensi || 0) + (item.hasil_effisiensi || 0)
          itemDitemukan.pagu = item.pagu
          if (item.array_pagu.length >= 1) {
            let hasilSimpenanKalkulasiRencanaFisik = 0
            let hasilSimpenanKalkulasiRealisasiFisik = 0
            let hasilSimpenanKalkulasiRencanaKeuangan = 0
            let hasilSimpenanKalkulasiRealisasiKeuangan = 0
            for (let i = 0; i < item.array_pagu.length; i++) {
              hasilSimpenanKalkulasiRencanaFisik +=
                (item.array_pagu[i] * item.array_rencana_fisik[i]) / 100
              hasilSimpenanKalkulasiRealisasiFisik +=
                (item.array_pagu[i] * item.array_realisasi_fisik[i]) / 100
              hasilSimpenanKalkulasiRencanaKeuangan +=
                (item.array_pagu[i] * item.array_rencana_keuangan[i]) / 100
              hasilSimpenanKalkulasiRealisasiKeuangan +=
                (item.array_pagu[i] * item.array_realisasi_keuangan[i]) / 100
            }
            itemDitemukan.rencana_fisik = (hasilSimpenanKalkulasiRencanaFisik / item.pagu) * 100
            itemDitemukan.realisasi_fisik = (hasilSimpenanKalkulasiRealisasiFisik / item.pagu) * 100
            itemDitemukan.rencana_keuangan =
              (hasilSimpenanKalkulasiRencanaKeuangan / item.pagu) * 100
            itemDitemukan.realisasi_keuangan =
              (hasilSimpenanKalkulasiRealisasiKeuangan / item.pagu) * 100
          }
        }
      }
      if (item.kode_result == 'D') {
        let itemDitemukan = dataSIPP.resultD.find((data) => data.kode == item.kode)
        if (itemDitemukan) {
          itemDitemukan.hasil_effisiensi =
            (itemDitemukan.hasil_effisiensi || 0) + (item.hasil_effisiensi || 0)
          itemDitemukan.pagu = item.pagu
          if (item.array_pagu.length >= 1) {
            let hasilSimpenanKalkulasiRencanaFisik = 0
            let hasilSimpenanKalkulasiRealisasiFisik = 0
            let hasilSimpenanKalkulasiRencanaKeuangan = 0
            let hasilSimpenanKalkulasiRealisasiKeuangan = 0
            for (let i = 0; i < item.array_pagu.length; i++) {
              hasilSimpenanKalkulasiRencanaFisik +=
                (item.array_pagu[i] * item.array_rencana_fisik[i]) / 100
              hasilSimpenanKalkulasiRealisasiFisik +=
                (item.array_pagu[i] * item.array_realisasi_fisik[i]) / 100
              hasilSimpenanKalkulasiRencanaKeuangan +=
                (item.array_pagu[i] * item.array_rencana_keuangan[i]) / 100
              hasilSimpenanKalkulasiRealisasiKeuangan +=
                (item.array_pagu[i] * item.array_realisasi_keuangan[i]) / 100
            }
            itemDitemukan.rencana_fisik = (hasilSimpenanKalkulasiRencanaFisik / item.pagu) * 100
            itemDitemukan.realisasi_fisik = (hasilSimpenanKalkulasiRealisasiFisik / item.pagu) * 100
            itemDitemukan.rencana_keuangan =
              (hasilSimpenanKalkulasiRencanaKeuangan / item.pagu) * 100
            itemDitemukan.realisasi_keuangan =
              (hasilSimpenanKalkulasiRealisasiKeuangan / item.pagu) * 100
          }
        }
      }
    })

    const rekapTotal = {
      resultSatker: [...dataEmon.resultSatker],
      resultA: [...dataSIPP.resultA, ...dataEmon.resultA],
      resultB: [...dataSIPP.resultB, ...dataEmon.resultB],
      resultC: [...dataSIPP.resultC, ...dataEmon.resultC],
      resultD: [...dataSIPP.resultD, ...dataEmon.resultD],
    }

    generateExcel2(rekapTotal)
  })
})

function getFromStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else if (result[key]) {
        resolve(result[key].result)
      } else {
        reject(new Error(`Key '${key}' not found in storage`))
      }
    })
  })
}

async function generateExcel2(data) {
  const ExcelJS = window.ExcelJS // Use the window global ExcelJS (imported via CDN)
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Results')

  const row1 = ws.addRow(['LAPORAN PROGRESS PEKERJAAN'])
  const row2 = ws.addRow(['SATKER PJN WILAYAH III PROV.JABAR'])

  ws.mergeCells('A1:L1')
  ws.mergeCells('A2:L2')

  const cell1 = row1.getCell(1)
  const cell2 = row2.getCell(1)

  cell1.font = { bold: true, size: 15 }
  cell1.alignment = { horizontal: 'center', vertical: 'middle' }

  cell2.font = { bold: true, size: 15 }
  cell2.alignment = { horizontal: 'center', vertical: 'middle' }

  ws.addRow([]) // baris kosong

  const date = new Date()
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  ws.addRow([`Generated on: ${formattedDate}`]).style = {
    font: { italic: true, size: 10 },
    alignment: { horizontal: 'right' },
  }

  const headers1 = [
    'No',
    'Paket',
    'Pagu Dipa (Rp Ribu)',
    'Pagu Setelah Effisiensi (Rp Ribu)',
    'Progress Fisik',
    '',
    '',
    'Progress Keuangan',
    '',
    '',
    'DFK',
    'Keterangan',
  ]
  const headers2 = [
    '',
    '',
    '',
    '',
    'Rencana',
    'Realisasi',
    'Deviasi',
    'Rencana',
    'Realisasi',
    'Deviasi',
    '',
    '',
  ]

  ws.addRow(headers1)
  ws.addRow(headers2)

  const headerStyle = {
    font: { bold: true, size: 12 },
    alignment: { horizontal: 'center', vertical: 'middle' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    },
  }

  ws.getRow(5).eachCell((cell) => {
    cell.style = headerStyle
  })

  ws.getRow(6).eachCell((cell) => {
    cell.style = headerStyle
  })

  let TotalPaguKeseluruhan = null
  let TotalPaguEfisiensiKeseluruhan = null

  //Start Tambahan untuk mengetahui total fisik dan keuangan keseluruhan
  let tempTotalPaguKeseluruhan = []
  let tempTotalPaguEfisiensiKeseluruhan = []
  let tempTotalRencanaFisikKeseluruhan = []
  let tempTotalRealisasiFisikKeseluruhan = []
  let tempTotalRencanaKeuanganKeseluruhan = []
  let tempTotalRealisasiKeuanganKeseluruhan = []

  let tempTotalPerhitunganRencanaFisikKeseluruhanSummary = []
  let tempTotalPerhitunganRealisasiFisikKeseluruhanSummary = []
  let tempTotalPerhitunganRencanaKeuanganKeseluruhanSummary = []
  let tempTotalPerhitunganRealisasiKeuanganKeseluruhanSummary = []

  //End tambahan untuk mengetahui total fisik dan keuangan keseluruhan

  const addGroupToSheet = (groupName, groupData) => {
    if (groupData.length > 0) {
      const groupRow = ws.addRow([groupName + ':'])
      ws.mergeCells(`A${ws.lastRow.number}:L${ws.lastRow.number}`)

      groupRow.getCell(1).style = {
        font: { bold: true },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD3D3D3' },
        },
      }

      const calculasiDevisiasi = (realisasi, rencana) => {
        if (realisasi === '' || rencana === '' || isNaN(realisasi) || isNaN(rencana)) {
          return ' '
        } else {
          return parseFloat(realisasi - rencana).toFixed(2)
        }
      }

      let totalPagu = 0
      let totalPaguEffisiensi = 0

      //tambahan untuk total fisik dan keuangan per group
      let tempTotalRencanaFisik = 0
      let tempTotalRealisasiFisik = 0
      let tempTotalRencanaKeuangan = 0
      let tempTotalRealisasiKeuangan = 0

      groupData.forEach((item, index) => {
        TotalPaguKeseluruhan += item.pagu
        TotalPaguEfisiensiKeseluruhan += item.hasil_effisiensi

        totalPagu += item.pagu
        totalPaguEffisiensi += item.hasil_effisiensi

        const row = ws.addRow([
          index + 1,
          item.nama,
          item.pagu.toLocaleString('id-ID'),
          item.hasil_effisiensi.toLocaleString('id-ID'),
          parseFloat(item.rencana_fisik).toFixed(2),
          parseFloat(item.realisasi_fisik).toFixed(2),
          calculasiDevisiasi(item.realisasi_fisik, item.rencana_fisik),
          parseFloat(item.rencana_keuangan).toFixed(2),
          parseFloat(item.realisasi_keuangan).toFixed(2),
          calculasiDevisiasi(item.realisasi_keuangan, item.rencana_keuangan),
          calculasiDevisiasi(item.realisasi_fisik, item.realisasi_keuangan),
          item.keterangan,
        ])

        //Start Tambahan untuk total fisik dan keuangan per group
        tempTotalRealisasiFisik += (item.hasil_effisiensi * item.realisasi_fisik) / 100
        tempTotalRencanaFisik += (item.hasil_effisiensi * item.rencana_fisik) / 100
        tempTotalRealisasiKeuangan += (item.hasil_effisiensi * item.realisasi_keuangan) / 100
        tempTotalRencanaKeuangan += (item.hasil_effisiensi * item.rencana_keuangan) / 100
        //End Tambahan untuk total fisik dan keuangan per group

        row.getCell(2).style = {
          alignment: { vertical: 'middle' },
        }

        row.getCell(1).style = {
          alignment: { horizontal: 'center', vertical: 'middle' },
          font: { bold: true },
        }

        row.getCell(3).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(4).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(5).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(6).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(7).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(8).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(9).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(10).style = { alignment: { horizontal: 'center', vertical: 'middle' } }
        row.getCell(11).style = { alignment: { horizontal: 'center', vertical: 'middle' } }

        row.getCell(12).style = { alignment: { wrapText: true } }
        const keteranganCell = row.getCell(12)
        keteranganCell.height = undefined

        if (
          item.realisasi_fisik === '' ||
          item.realisasi_keuangan === '' ||
          isNaN(item.realisasi_fisik) ||
          isNaN(item.realisasi_keuangan) ||
          (Number(item.realisasi_fisik) === 0 &&
            Number(item.realisasi_keuangan) === 0 &&
            Number(item.rencana_fisik) === 0 &&
            Number(item.rencana_keuangan) === 0)
        ) {
          for (let col = 5; col <= 12; col++) {
            if (col != 12) row.getCell(col).value = ''
            row.getCell(col).style = {
              fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' }, // Kuning
              },
              alignment: { horizontal: 'center', vertical: 'middle' },
            }
          }
        }

        const deviasiFisikCell = row.getCell(7)
        const deviasiKeuanganCell = row.getCell(10)
        const DFK = row.getCell(11)

        if (calculasiDevisiasi(item.realisasi_fisik, item.rencana_fisik) < 0) {
          deviasiFisikCell.style.font = { color: { argb: 'FFFF0000' } }
        }
        if (calculasiDevisiasi(item.realisasi_keuangan, item.rencana_keuangan) < 0) {
          deviasiKeuanganCell.style.font = { color: { argb: 'FFFF0000' } }
        }
        if (calculasiDevisiasi(item.realisasi_fisik, item.realisasi_keuangan) < 0) {
          DFK.style.font = { color: { argb: 'FFFF0000' } }
        }

        for (let col = 1; col <= 12; col++) {
          row.getCell(col).style.border = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } },
          }
        }
      })
      // Tambahkan baris kosong
      ws.addRow([])

      // Dapatkan nomor baris yang baru saja ditambahkan
      const rowNumber = ws.lastRow.number

      // Merge kolom A dan B, lalu isi "Total:"
      ws.mergeCells(`A${rowNumber}:B${rowNumber}`)
      ws.getCell(`A${rowNumber}`).value = 'Total:'
      ws.getCell(`A${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      // Isi kolom C dan D
      ws.getCell(`D${rowNumber}`).value = totalPaguEffisiensi.toLocaleString('id-ID')
      ws.getCell(`D${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      ws.getCell(`C${rowNumber}`).value = totalPagu.toLocaleString('id-ID')
      ws.getCell(`C${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      // Merge kolom E sampai L
      // ws.mergeCells(`E${rowNumber}:L${rowNumber}`)
      // const mergedEK = ws.getCell(`E${rowNumber}`)
      // mergedEK.value = '' // Optional
      // mergedEK.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: 'D9D9D9' }, // Warna abu-abu
      // }
      // mergedEK.alignment = { vertical: 'middle', horizontal: 'center' }

      //tambahan untuk total fisik dan keuangan per group
      let TotalPerhitunganRencanaFisik = 0
      let TotalPerhitunganRealisasiFisik = 0
      let TotalPerhitunganRencanaKeuangan = 0
      let TotalPerhitunganRealisasiKeuangan = 0

      TotalPerhitunganRencanaFisik = (tempTotalRencanaFisik / totalPaguEffisiensi) * 100
      TotalPerhitunganRealisasiFisik = (tempTotalRealisasiFisik / totalPaguEffisiensi) * 100
      TotalPerhitunganRencanaKeuangan = (tempTotalRencanaKeuangan / totalPaguEffisiensi) * 100
      TotalPerhitunganRealisasiKeuangan = (tempTotalRealisasiKeuangan / totalPaguEffisiensi) * 100

      ws.getCell(`E${rowNumber}`).value = parseFloat(TotalPerhitunganRencanaFisik).toFixed(2)
      ws.getCell(`E${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      ws.getCell(`F${rowNumber}`).value = parseFloat(TotalPerhitunganRealisasiFisik).toFixed(2)
      ws.getCell(`F${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      //Hitung Deviasi Fisik
      ws.getCell(`G${rowNumber}`).value = parseFloat(
        TotalPerhitunganRealisasiFisik - TotalPerhitunganRencanaFisik,
      ).toFixed(2)
      ws.getCell(`G${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      ws.getCell(`H${rowNumber}`).value = parseFloat(TotalPerhitunganRencanaKeuangan).toFixed(2)
      ws.getCell(`H${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      ws.getCell(`I${rowNumber}`).value = parseFloat(TotalPerhitunganRealisasiKeuangan).toFixed(2)
      ws.getCell(`I${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      //Hitung Deviasi Keuangan
      ws.getCell(`J${rowNumber}`).value = parseFloat(
        TotalPerhitunganRealisasiKeuangan - TotalPerhitunganRencanaKeuangan,
      ).toFixed(2)
      ws.getCell(`J${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      //Hitung DFK
      ws.getCell(`K${rowNumber}`).value = parseFloat(
        TotalPerhitunganRealisasiFisik - TotalPerhitunganRealisasiKeuangan,
      ).toFixed(2)
      ws.getCell(`K${rowNumber}`).alignment = { vertical: 'middle', horizontal: 'center' }

      //berikan warna abu dan bold pada total per group berikan warna merah jika deviasi minus
      for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
        const cell = ws.getCell(`${col}${rowNumber}`)
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEDEDED' }, // Warna abu-abu
        }
        if (col === 'G' || col === 'K') {
          if (parseFloat(cell.value) < 0) {
            cell.font = { bold: true }
            cell.font = { color: { argb: 'FFFF0000' }, bold: true }
          } else {
            cell.font = { bold: true }
          }
        } else {
          if (parseFloat(cell.value) < 0) {
            cell.font = { bold: true }
            cell.font = { color: { argb: 'FFFF0000' }, bold: true }
          } else {
            cell.font = { bold: true }
          }
        }
      }

      //masukkan ke dalam array keseluruhan
      tempTotalPaguKeseluruhan.push(totalPagu)
      tempTotalPaguEfisiensiKeseluruhan.push(totalPaguEffisiensi)
      tempTotalRencanaFisikKeseluruhan.push(tempTotalRencanaFisik)
      tempTotalRealisasiFisikKeseluruhan.push(tempTotalRealisasiFisik)
      tempTotalRencanaKeuanganKeseluruhan.push(tempTotalRencanaKeuangan)
      tempTotalRealisasiKeuanganKeseluruhan.push(tempTotalRealisasiKeuangan)

      tempTotalPerhitunganRencanaFisikKeseluruhanSummary.push(TotalPerhitunganRencanaFisik)
      tempTotalPerhitunganRealisasiFisikKeseluruhanSummary.push(TotalPerhitunganRealisasiFisik)
      tempTotalPerhitunganRencanaKeuanganKeseluruhanSummary.push(TotalPerhitunganRencanaKeuangan)
      tempTotalPerhitunganRealisasiKeuanganKeseluruhanSummary.push(
        TotalPerhitunganRealisasiKeuangan,
      )
      //end tambahan untuk total fisik dan keuangan per group

      // Tambahkan border untuk seluruh kolom A sampai L di baris tersebut
      for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
        const cell = ws.getCell(`${col}${rowNumber}`)
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      }
    }
  }

  //end buat

  // Add each result group to the sheet
  addGroupToSheet('Satker PJN III PROV JABAR : Indra Gunawan, S.T, M.Eng', data.resultSatker)
  addGroupToSheet('PPK 3.1 : Clara AG Simatupang, S.T, M.T', data.resultA)
  addGroupToSheet('PPK 3.2 : Arianto, S.T, M.T', data.resultB)
  addGroupToSheet('PPK 3.3 : Agung Wihartanto, S.T.,MT', data.resultC)
  addGroupToSheet('PPK 3.4 : Rico Octriyana, S.T, M.T', data.resultD)

  // Merging cells
  ws.mergeCells('A4:I4')
  ws.mergeCells('A5:A6') // Merge kolom 'No'
  ws.mergeCells('B5:B6') // Merge kolom 'Paket'
  ws.mergeCells('C5:C6') // Merge kolom 'Paket'
  ws.mergeCells('D5:D6') // Merge kolom 'Paket'
  ws.mergeCells('K5:K6') // Merge kolom 'DFK'
  ws.mergeCells('L5:L6') // Merge kolom 'Keterangan'
  ws.mergeCells('E5:G5') // Merge untuk 'Progress Fisik'
  ws.mergeCells('H5:J5') // Merge untuk 'Progress Keuangan'

  // Set column widths
  ws.getColumn(1).width = 5 // No
  ws.getColumn(2).width = 80 // Paket

  ws.getColumn(3).width = 25 // Pagu Effisiensi
  ws.getColumn(4).width = 25 // Pagu Effisiensi

  ws.getColumn(5).width = 10 // Rencana Fisik
  ws.getColumn(6).width = 10 // Realisasi Fisik
  ws.getColumn(7).width = 10 // Deviasi Fisik
  ws.getColumn(8).width = 10 // Rencana Keuangan
  ws.getColumn(9).width = 10 // Realisasi Keuangan
  ws.getColumn(10).width = 10 // Deviasi Keuangan
  ws.getColumn(11).width = 10 // Keterangan
  ws.getColumn(12).width = 60 // Keterangan

  // Wrap Teks Keterangan & Paket
  ws.getColumn(2).alignment = { wrapText: true }
  ws.getColumn(12).alignment = { wrapText: true }

  ws.getCell('A5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('B5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('C5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('D5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('E5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('F5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('G5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('H5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('I5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('J5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('K5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('L5').style.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getCell('C5').alignment = {
    ...headerStyle.alignment,
    wrapText: true,
  }
  // 🔹 Kalkulasi total pagu keseluruhan dan pagu efisiensi keseluruhan
  const akhiriBaris = ws.lastRow.number + 1
  ws.mergeCells(`A${akhiriBaris}:B${akhiriBaris}`)

  // Teks Total Keseluruhan
  ws.getCell(`A${akhiriBaris}`).value = 'TOTAL KESELURUHAN:'
  ws.getCell(`A${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws.getCell(`A${akhiriBaris}`).font = { bold: true, size: 14 }

  // Total Pagu
  ws.getCell(`C${akhiriBaris}`).value = TotalPaguKeseluruhan.toLocaleString('id-ID')
  ws.getCell(`C${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws.getCell(`C${akhiriBaris}`).font = { bold: true, size: 14 }

  // Total Efisiensi
  ws.getCell(`D${akhiriBaris}`).value = TotalPaguEfisiensiKeseluruhan.toLocaleString('id-ID')
  ws.getCell(`D${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws.getCell(`D${akhiriBaris}`).font = { bold: true, size: 14 }

  //Start Tambahan untuk total fisik dan keuangan keseluruhan
  let TotalPerhitunganRencanaFisikKeseluruhan = 0
  let TotalPerhitunganRealisasiFisikKeseluruhan = 0
  let TotalPerhitunganRencanaKeuanganKeseluruhan = 0
  let TotalPerhitunganRealisasiKeuanganKeseluruhan = 0

  TotalPerhitunganRencanaFisikKeseluruhan =
    (tempTotalRencanaFisikKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100
  TotalPerhitunganRealisasiFisikKeseluruhan =
    (tempTotalRealisasiFisikKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100
  TotalPerhitunganRencanaKeuanganKeseluruhan =
    (tempTotalRencanaKeuanganKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100
  TotalPerhitunganRealisasiKeuanganKeseluruhan =
    (tempTotalRealisasiKeuanganKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100

  //Bagian Fisik
  ws.getCell(`E${akhiriBaris}`).value = parseFloat(TotalPerhitunganRencanaFisikKeseluruhan).toFixed(
    2,
  )
  ws.getCell(`E${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  ws.getCell(`F${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRealisasiFisikKeseluruhan,
  ).toFixed(2)
  ws.getCell(`F${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  //Hitung Deviasi Fisik
  ws.getCell(`G${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRealisasiFisikKeseluruhan - TotalPerhitunganRencanaFisikKeseluruhan,
  ).toFixed(2)
  ws.getCell(`G${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  // bagian keunagan
  ws.getCell(`H${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRencanaKeuanganKeseluruhan,
  ).toFixed(2)
  ws.getCell(`H${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  ws.getCell(`I${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRealisasiKeuanganKeseluruhan,
  ).toFixed(2)
  ws.getCell(`I${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  //Hitung Deviasi Keuangan
  ws.getCell(`J${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRealisasiKeuanganKeseluruhan - TotalPerhitunganRencanaKeuanganKeseluruhan,
  ).toFixed(2)
  ws.getCell(`J${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  //hitung DFK
  ws.getCell(`K${akhiriBaris}`).value = parseFloat(
    TotalPerhitunganRealisasiFisikKeseluruhan - TotalPerhitunganRealisasiKeuanganKeseluruhan,
  ).toFixed(2)
  ws.getCell(`K${akhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  // // Merge kolom E–L dan beri warna latar
  // ws.mergeCells(`E${akhiriBaris}:L${akhiriBaris}`)
  // const mergedTotal = ws.getCell(`E${akhiriBaris}`)
  // mergedTotal.alignment = { vertical: 'middle', horizontal: 'center' }

  // 🔹 Tambahkan border dan latar warna agar serasi
  // for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
  //   ws.getCell(`${col}${akhiriBaris}`).border = {
  //     top: { style: 'thin' },
  //     left: { style: 'thin' },
  //     bottom: { style: 'thin' },
  //     right: { style: 'thin' },
  //   }
  //   ws.getCell(`${col}${akhiriBaris}`).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'D9D9D9' }, // Warna abu-abu
  //   }
  // }

  //berikan warna abu dan bold pada total per group berikan warna merah jika deviasi minus dan tak lupa border
  for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']) {
    const cell = ws.getCell(`${col}${akhiriBaris}`)
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFd3d3d3' }, // Warna abu-abu
    }
    if (col === 'G' || col === 'K') {
      if (parseFloat(cell.value) < 0) {
        cell.font = { bold: true }
        cell.font = { color: { argb: 'FFFF0000' }, bold: true }
      } else {
        cell.font = { bold: true }
      }
    } else {
      if (parseFloat(cell.value) < 0) {
        cell.font = { bold: true }
        cell.font = { color: { argb: 'FFFF0000' }, bold: true }
      } else {
        cell.font = { bold: true }
      }
    }

    //tambahkan border
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  }
  //End tambahan untuk total fisik dan keuangan keseluruhan

  //start PAGE 2 ========================================================
  //start buat halaman baru hanya menampilkan kesimpulan tiap grupnya
  ws2 = wb.addWorksheet('Summary')
  ws2.addRow(['KESIMPULAN PROGRESS PEKERJAAN']).font = { bold: true, size: 15 }
  ws2.addRow(['SATKER PJN WILAYAH III PROV.JABAR']).font = { bold: true, size: 15 }
  ws2.addRow([]) // baris kosong
  ws2.addRow([`Generated on: ${formattedDate}`]).style = {
    font: { italic: true, size: 10 },
    alignment: { horizontal: 'right' },
  }

  const summaryHeaders1 = [
    'No',
    'Unit Kerja',
    'Total Pagu (Rp Ribu)',
    'Total Pagu Setelah Efisiensi (Rp Ribu)',
    'Progress Fisik',
    '',
    '',
    'Progress Keuangan',
    '',
    '',
    'DFK',
  ]
  const summaryHeaders2 = [
    '',
    '',
    '',
    '',
    'Rencana',
    'Realisasi',
    'Deviasi',
    'Rencana',
    'Realisasi',
    'Deviasi',
    '',
  ]
  ws2.addRow(summaryHeaders1)
  ws2.addRow(summaryHeaders2)

  ws2.getRow(5).eachCell((cell) => {
    cell.style = headerStyle
  })
  ws2.getRow(6).eachCell((cell) => {
    cell.style = headerStyle
  })

  const addSummaryToSheet = (groupName, index) => {
    const row = ws2.addRow([
      index + 1,
      groupName,
      tempTotalPaguKeseluruhan[index].toLocaleString('id-ID'),
      tempTotalPaguEfisiensiKeseluruhan[index].toLocaleString('id-ID'),
      parseFloat(tempTotalPerhitunganRencanaFisikKeseluruhanSummary[index]).toFixed(2),
      parseFloat(tempTotalPerhitunganRealisasiFisikKeseluruhanSummary[index]).toFixed(2),
      parseFloat(
        tempTotalPerhitunganRealisasiFisikKeseluruhanSummary[index] -
          tempTotalPerhitunganRencanaFisikKeseluruhanSummary[index],
      ).toFixed(2),

      parseFloat(tempTotalPerhitunganRencanaKeuanganKeseluruhanSummary[index]).toFixed(2),
      parseFloat(tempTotalPerhitunganRealisasiKeuanganKeseluruhanSummary[index]).toFixed(2),
      parseFloat(
        tempTotalPerhitunganRealisasiKeuanganKeseluruhanSummary[index] -
          tempTotalPerhitunganRencanaKeuanganKeseluruhanSummary[index],
      ).toFixed(2),

      parseFloat(
        tempTotalPerhitunganRealisasiFisikKeseluruhanSummary[index] -
          tempTotalPerhitunganRealisasiKeuanganKeseluruhanSummary[index],
      ).toFixed(2),
    ])
    row.getCell(2).style = {
      alignment: { vertical: 'middle' },
    }
    row.getCell(1).style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
      font: { bold: true },
    }

    //berikan warna merah pada deviasi yang minus
    const deviasiFisikCell = row.getCell(7)
    const deviasiKeuanganCell = row.getCell(10)
    const DFK = row.getCell(11)
    if (parseFloat(deviasiFisikCell.value) < 0) {
      deviasiFisikCell.font = { color: { argb: 'FFFF0000' } }
    }
    if (parseFloat(deviasiKeuanganCell.value) < 0) {
      deviasiKeuanganCell.font = { color: { argb: 'FFFF0000' } }
    }
    if (parseFloat(DFK.value) < 0) {
      DFK.font = { color: { argb: 'FFFF0000' } }
    }

    //beri border pada setiap cell
    for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']) {
      const cell = row.getCell(`${col}`)
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      }
    }
  }

  addSummaryToSheet('Satker PJN III PROV JABAR ', 0)
  addSummaryToSheet('PPK 3.1 ', 1)
  addSummaryToSheet('PPK 3.2 ', 2)
  addSummaryToSheet('PPK 3.3 ', 3)
  addSummaryToSheet('PPK 3.4 ', 4)

  //Buat Kalkulasi untuk Jumlah Keseluruhan
  const summaryAkhiriBaris = ws2.lastRow.number + 1
  ws2.mergeCells(`A${summaryAkhiriBaris}:B${summaryAkhiriBaris}`)
  ws2.getCell(`A${summaryAkhiriBaris}`).value = 'TOTAL KESELURUHAN:'
  ws2.getCell(`A${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`A${summaryAkhiriBaris}`).font = { bold: true, size: 12 }
  ws2.getCell(`C${summaryAkhiriBaris}`).value = TotalPaguKeseluruhan.toLocaleString('id-ID')
  ws2.getCell(`C${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`C${summaryAkhiriBaris}`).font = { bold: true, size: 12 }
  ws2.getCell(`D${summaryAkhiriBaris}`).value =
    TotalPaguEfisiensiKeseluruhan.toLocaleString('id-ID')
  ws2.getCell(`D${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`D${summaryAkhiriBaris}`).font = { bold: true, size: 12 }

  //Perhitungan Fisik dan Keuangan Keseluruhan

  let RencanFisikSummary =
    (tempTotalRencanaFisikKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100

  let RealisasiFisikSummary =
    (tempTotalRealisasiFisikKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100

  let RencanKeuanganSummary =
    (tempTotalRencanaKeuanganKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100

  let RealisasiKeuanganSummary =
    (tempTotalRealisasiKeuanganKeseluruhan.reduce((a, b) => a + b, 0) /
      tempTotalPaguEfisiensiKeseluruhan.reduce((a, b) => a + b, 0)) *
    100

  ws2.getCell(`E${summaryAkhiriBaris}`).value = parseFloat(RencanFisikSummary).toFixed(2)
  ws2.getCell(`E${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`F${summaryAkhiriBaris}`).value = parseFloat(RealisasiFisikSummary).toFixed(2)
  ws2.getCell(`F${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`G${summaryAkhiriBaris}`).value = parseFloat(
    RealisasiFisikSummary - RencanFisikSummary,
  ).toFixed(2)
  ws2.getCell(`G${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`H${summaryAkhiriBaris}`).value = parseFloat(RencanKeuanganSummary).toFixed(2)
  ws2.getCell(`H${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`I${summaryAkhiriBaris}`).value = parseFloat(RealisasiKeuanganSummary).toFixed(2)
  ws2.getCell(`I${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`J${summaryAkhiriBaris}`).value = parseFloat(
    RealisasiKeuanganSummary - RencanKeuanganSummary,
  ).toFixed(2)
  ws2.getCell(`J${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }
  ws2.getCell(`K${summaryAkhiriBaris}`).value = parseFloat(
    RealisasiFisikSummary - RealisasiKeuanganSummary,
  ).toFixed(2)
  ws2.getCell(`K${summaryAkhiriBaris}`).alignment = { vertical: 'middle', horizontal: 'center' }

  //berikan jarak dan styling pada total keseluruhan di halaman 2
  for (let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']) {
    const cell = ws2.getCell(`${col}${summaryAkhiriBaris}`)
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFd3d3d3' }, // Warna abu-abu
    }
    if (col) {
      if (parseFloat(cell.value) < 0) {
        cell.font = { bold: true }
        cell.font = { color: { argb: 'FFFF0000' }, bold: true }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      } else {
        cell.font = { bold: true }
      }
    }
    //tambahkan border
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  }

  ws2.mergeCells('A5:A6') // Merge kolom 'No'
  ws2.mergeCells('B5:B6') // Merge kolom 'Unit Kerja'
  ws2.mergeCells('C5:C6') // Merge kolom 'Total Pagu'
  ws2.mergeCells('D5:D6') // Merge kolom 'Total Pagu Setelah Efisiensi'
  ws2.mergeCells('K5:K6') // Merge kolom 'DFK'
  ws2.mergeCells('E5:G5') // Merge untuk 'Progress Fisik'
  ws2.mergeCells('H5:J5') // Merge untuk 'Progress Keuangan'

  //berikan jarak
  ws2.getColumn(1).width = 5 // No
  ws2.getColumn(2).width = 25 // Unit Kerja
  ws2.getColumn(3).width = 20 // Pagu Effisiensi
  ws2.getColumn(4).width = 20 // Pagu Effisiensi
  ws2.getColumn(5).width = 10 // Rencana Fisik
  ws2.getColumn(6).width = 10 // Realisasi Fisik
  ws2.getColumn(7).width = 10 // Deviasi Fisik
  ws2.getColumn(8).width = 10 // Rencana Keuangan
  ws2.getColumn(9).width = 10 // Realisasi Keuangan
  ws2.getColumn(10).width = 10 // Deviasi Keuangan
  ws2.getColumn(11).width = 10 // DFK

  //end PAGE 2 ========================================================

  // Save the workbook to file
  await wb.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const waktu = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Data Generated ${waktu}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
  })
}
