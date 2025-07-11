document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  const url = tab?.url || ''

  const activeStates = {
    rencanaFisik: url.includes('iemon.pu.go.id/pep_datarencanafisik'),
    rencanaKeuangan: url.includes('iemon.pu.go.id/pep_datarencana'),
    SIPP: url.includes(
      'sipp.pu.go.id/monevpro/pages/table_monitoring_percepatan/halaman_table_paket_kontraktual_gabungan.php',
    ),
    satker: url.includes('iemon.pu.go.id/paket2020'),
  }

  // Loop ke setiap tombol dan disable kalau bukan tab yang cocok
  if (!activeStates.rencanaKeuangan) {
    document.getElementById('rencanaKeuangan').disabled = true
  }

  if (!activeStates.rencanaFisik) {
    document.getElementById('rencanaFisik').disabled = true
  }

  if (!activeStates.SIPP) {
    document.getElementById('SIPP').disabled = true
  }

  if (!activeStates.satker) {
    document.getElementById('satker').disabled = true
  }

  // (Opsional) debug
  console.log('URL:', url)
  console.log('activeStates:', activeStates)
})
