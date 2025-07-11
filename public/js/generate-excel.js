document.addEventListener('DOMContentLoaded', async function () {
  const generatedBtn = document.getElementById('excelPage')

  generatedBtn.addEventListener('click', async function () {
    const dataSIPP = await getFromStorage('dataSIPP')
    const dataEmon = await getFromStorage('dataEmon')

    const rekapTotal = {
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

  ws.mergeCells('A1:J1')
  ws.mergeCells('A2:J2')

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

  const addGroupToSheet = (groupName, groupData) => {
    if (groupData.length > 0) {
      const groupRow = ws.addRow([groupName + ':'])
      ws.mergeCells(`A${ws.lastRow.number}:J${ws.lastRow.number}`)

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
          return parseFloat(realisasi - rencana)
        }
      }

      groupData.forEach((item, index) => {
        const row = ws.addRow([
          index + 1,
          item.nama,
          item.rencana_fisik,
          item.realisasi_fisik,
          calculasiDevisiasi(item.realisasi_fisik, item.rencana_fisik),
          // item.deviasi_fisik,
          item.rencana_keuangan,
          item.realisasi_keuangan,
          calculasiDevisiasi(item.realisasi_keuangan, item.rencana_keuangan),
          // item.deviasi_keuangan,
          calculasiDevisiasi(item.realisasi_fisik, item.realisasi_keuangan),
          item.keterangan,
        ])

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

        row.getCell(10).style = { alignment: { wrapText: true } }
        const keteranganCell = row.getCell(10)
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
          for (let col = 3; col <= 10; col++) {
            if (col != 10) row.getCell(col).value = ''
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

        const deviasiFisikCell = row.getCell(5)
        const deviasiKeuanganCell = row.getCell(8)
        const DFK = row.getCell(9)

        if (calculasiDevisiasi(item.realisasi_fisik, item.rencana_fisik) < 0) {
          deviasiFisikCell.style.font = { color: { argb: 'FFFF0000' } }
        }
        if (calculasiDevisiasi(item.realisasi_keuangan, item.rencana_keuangan) < 0) {
          deviasiKeuanganCell.style.font = { color: { argb: 'FFFF0000' } }
        }
        if (calculasiDevisiasi(item.realisasi_fisik, item.realisasi_keuangan) < 0) {
          DFK.style.font = { color: { argb: 'FFFF0000' } }
        }

        for (let col = 1; col <= 10; col++) {
          row.getCell(col).style.border = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } },
          }
        }
      })
    }
  }

  // Add each result group to the sheet
  addGroupToSheet('PPK 3.1 : Clara AG Simatupang, ST, M.T', data.resultA)
  addGroupToSheet('PPK 3.2 : Arianto, ST, M.T', data.resultB)
  addGroupToSheet('PPK 3.3 : Agung Wihartanto, ST.,MT', data.resultC)
  addGroupToSheet('PPK 3.4 : Rico Octriyana, ST, M.T', data.resultD)

  // Merging cells
  ws.mergeCells('A4:I4') // Merge kolom 'No'
  ws.mergeCells('A5:A6') // Merge kolom 'No'
  ws.mergeCells('B5:B6') // Merge kolom 'Paket'
  ws.mergeCells('I5:I6') // Merge kolom 'DFK'
  ws.mergeCells('J5:J6') // Merge kolom 'Keterangan'
  ws.mergeCells('C5:E5') // Merge untuk 'Progress Fisik'
  ws.mergeCells('F5:H5') // Merge untuk 'Progress Keuangan'

  // Set column widths
  ws.getColumn(1).width = 5 // No
  ws.getColumn(2).width = 80 // Paket
  ws.getColumn(3).width = 10 // Rencana Fisik
  ws.getColumn(4).width = 10 // Realisasi Fisik
  ws.getColumn(5).width = 10 // Deviasi Fisik
  ws.getColumn(6).width = 10 // Rencana Keuangan
  ws.getColumn(7).width = 10 // Realisasi Keuangan
  ws.getColumn(8).width = 10 // Deviasi Keuangan
  ws.getColumn(9).width = 10 // Keterangan
  ws.getColumn(10).width = 60 // Keterangan

  // Wrap Teks Keterangan & Paket
  ws.getColumn(2).alignment = { wrapText: true }
  ws.getColumn(10).alignment = { wrapText: true }

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

  //berikan border untuk semua

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
