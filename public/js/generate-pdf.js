document.addEventListener('DOMContentLoaded', function () {
  const pdfButton = document.getElementById('pdfPage')
  pdfButton.addEventListener('click', async function () {
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

    // Proses penggabungan data seperti di generateExcel
    dataSimpenan.forEach((item) => {
      const targetArray =
        item.kode_result === 'A'
          ? dataSIPP.resultA
          : item.kode_result === 'B'
            ? dataSIPP.resultB
            : item.kode_result === 'C'
              ? dataSIPP.resultC
              : dataSIPP.resultD

      const itemDitemukan = targetArray.find((data) => data.kode === item.kode)
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
          itemDitemukan.rencana_keuangan = (hasilSimpenanKalkulasiRencanaKeuangan / item.pagu) * 100
          itemDitemukan.realisasi_keuangan =
            (hasilSimpenanKalkulasiRealisasiKeuangan / item.pagu) * 100
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

    generatePDF(rekapTotal)
  })
})

/* Fungsi ambil data dari chrome storage */
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

/* ==============================
   ✅ Fungsi Generate PDF
   ============================== */
async function generatePDF(data) {
  const jsPDF = window.jspdf
  const doc = new jsPDF('l', 'mm', 'a4') // landscape mode
  const pageWidth = doc.internal.pageSize.getWidth()

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  // Judul
  doc.setFontSize(16)
  doc.text('LAPORAN PROGRESS PEKERJAAN', pageWidth / 2, 15, { align: 'center' })
  doc.text('SATKER PJN WILAYAH III PROV. JAWA BARAT', pageWidth / 2, 22, {
    align: 'center',
  })

  doc.setFontSize(10)
  doc.text(`Generated on: ${tanggal}`, pageWidth - 20, 30, { align: 'right' })

  let y = 40 // posisi awal vertikal

  const addGroupToPDF = (groupName, groupData) => {
    if (groupData.length === 0) return

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(groupName, 14, y)
    y += 6

    const headers = [
      [
        'No',
        'Paket',
        'Pagu (Rp Ribu)',
        'Effisiensi (Rp Ribu)',
        'Rencana Fisik',
        'Realisasi Fisik',
        'Rencana Keuangan',
        'Realisasi Keuangan',
        'Keterangan',
      ],
    ]

    const rows = groupData.map((item, i) => [
      i + 1,
      item.nama || '-',
      item.pagu?.toLocaleString('id-ID') || '-',
      item.hasil_effisiensi?.toLocaleString('id-ID') || '-',
      (item.rencana_fisik ?? 0).toFixed(2) + '%',
      (item.realisasi_fisik ?? 0).toFixed(2) + '%',
      (item.rencana_keuangan ?? 0).toFixed(2) + '%',
      (item.realisasi_keuangan ?? 0).toFixed(2) + '%',
      item.keterangan || '',
    ])

    doc.autoTable({
      startY: y,
      head: headers,
      body: rows,
      styles: {
        fontSize: 8,
        halign: 'center',
        valign: 'middle',
      },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        halign: 'center',
      },
      columnStyles: {
        1: { cellWidth: 60, halign: 'left' }, // Paket
        8: { cellWidth: 60, halign: 'left' }, // Keterangan
      },
    })

    y = doc.lastAutoTable.finalY + 10
  }

  // Tambahkan setiap grup
  addGroupToPDF('Satker PJN III PROV JABAR : Indra Gunawan, S.T, M.Eng', data.resultSatker)
  addGroupToPDF('PPK 3.1 : Clara AG Simatupang, S.T, M.T', data.resultA)
  addGroupToPDF('PPK 3.2 : Arianto, S.T, M.T', data.resultB)
  addGroupToPDF('PPK 3.3 : Agung Wihartanto, S.T., MT', data.resultC)
  addGroupToPDF('PPK 3.4 : Rico Octriyana, S.T, M.T', data.resultD)

  // Simpan file PDF
  const waktu = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  doc.save(`Data Generated ${waktu}.pdf`)
}
